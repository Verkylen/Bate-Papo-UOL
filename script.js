// let User;
// let Login;

// function Enter() {
//     User = document.querySelector('.Pop_up input').value;
//     document.querySelector('.Pop_up input').value = '';

//     if (User !== '') { 
//         Login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: User});
//         Login.then(Refresh);
//         Login.catch(Fail);
    // }
// }

let User = prompt('Digite seu nome de usuário:');
let Login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: User});

function Fail() {
    User = prompt('Infelizmente, esse nome já está em uso ou é inválido. Tente outro nome:');
    // alert(`
    // Infelizmente, esse nome já está em uso ou é inválido. 😕

    // Por favor, tente outro nome. 😊
    // `);

    Login = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: User});
    Login.then(Refresh);
    Login.catch(Fail);
}

Login.then(Refresh);
Login.catch(Fail);

function Active() {
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name: User});
}

function ErrorRequest(Response) {
    console.log('ErrorRequest');
    console.log(Response);
}

let Check = true;
let Run = true;
let IdInterval;
let Request;

function Refresh() {
    // if (!document.querySelector('.Pop_up').classList.contains('Ocult')) {
    //     document.querySelector('.Pop_up').classList.add('Ocult');
    //     setInterval(Active, 5000);
    // }

    if (Check) {
        setInterval(Active, 5000);
        Check = false;
    }

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

let Chat;

let View;

function Load(Response) {
    Chat = '';

    for (let i = 0; i < (Response.data).length; i++) {
        From = Response.data[i].from;
        To = Response.data[i].to;
        Txt = Response.data[i].text;
        Type = Response.data[i].type;
        Time = Response.data[i].time;

        switch(Type) {
            case 'status':
                Chat += `<div class="System_message"><time>${Time}</time><strong>${From}</strong> ${Txt}</div>`;
                break;
            
            case 'message':
                Chat += `<div class="Public_message"><time>${Time}</time><strong>${From}</strong> para <strong>${To}</strong><span>:</span>${Txt}</div>`;
                break;

            case 'private_message':
                if (From === User || To === User) {
                    Chat += `<div class="Private_message"><time>${Time}</time><strong>${From}</strong> reservadamente para <strong>${To}</strong><span>:</span>${Txt}</div>`;
                }
                break;
        }
    }

    document.querySelector('.Container').innerHTML = Chat;

    View = document.querySelector('.Container div:last-child');
    View.scrollIntoView();
}

function Clear() {
    clearInterval(IdInterval);
    Run = true;
    Refresh();
}

let Post;
let Message;

function ErrorPost() {
    window.location.reload();
}

function Send() {
    Message = document.querySelector('textarea').value;

    if (Message !== '') {
        Post = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', {from: User, to: 'Todos', text: Message, type:'message'});
        Post.then(Clear);
        Post.catch(ErrorPost);
        document.querySelector('textarea').value = '';
    }
}