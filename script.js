let User = prompt('Digite seu nome de usuário:');
let Login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: User});

function Fail(Response) {
    console.log('Fail')
    console.log(Response);
    console.log("Status code: " + Response.response.status);
	console.log("Mensagem de erro: " + Response.response.data);

    User = prompt('Infelizmente, esse nome já está em uso. Tente outro nome:');

    Login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: User});
    Login.then(Refresh);
    Login.catch(Fail);
}

Login.then(Refresh);
Login.catch(Fail);

function Active() {
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name: User});
}

setInterval(Active, 5000);

function ErrorRequest(Response) {
    console.log('ErrorRequest');
    console.log(Response);
}

let Run = true;
let IdInterval;
let Request;

function Refresh() {
    Request = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    Request.then(Load);
    Request.catch(ErrorRequest);

    if (Run) {
        IdInterval = setInterval(Refresh, 3000);
        Run = false;
    }
}


let From;
let To;
let Txt;
let Type;
let Time;

let View;

function Load(Response) {
    for (let i = 0; i < (Response.data).length; i++) {
        From = Response.data[i].from;
        To = Response.data[i].to;
        Txt = Response.data[i].text;
        Type = Response.data[i].type;
        Time = Response.data[i].time;

        switch(Type) {
            case 'status':
                document.querySelector('.Container').innerHTML += `<div class="System_message"><time>${Time}</time><strong>${From}</strong> ${Txt}</div>`;
                break;
            
            case 'message':
                document.querySelector('.Container').innerHTML += `<div class="Public_message"><time>${Time}</time><strong>${From}</strong> para <strong>${To}</strong><span>:</span>${Txt}</div>`;
                break;

            case 'private_message':
                if (From == User || To == User) {
                    document.querySelector('.Container').innerHTML += `<div class="Private_message"><time>${Time}</time><strong>${From}</strong> reservadamente para <strong>${To}</strong><span>:</span>${Txt}</div>`;
                }
                break;
        }
    }

    View = document.querySelector('.Container div:last-child');
    View.scrollIntoView();
}

function Clear() {
    document.querySelector('textarea').value = '';
    clearInterval(IdInterval);
    Run = true;
    Refresh();
}

let Post;
let Message;

function ErrorPost(Response) {
    console.log('ErrorPost');
    console.log(Response);
}

function Enter() {
    Message = document.querySelector('textarea').value;

    Post = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', {from: User, to: 'Rainha do zapzap', text: Message, type:'private_message'});
    Post.then(Clear);
    Post.catch(ErrorPost);
}

// teste