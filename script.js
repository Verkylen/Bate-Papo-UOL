let User = prompt('Digite seu nome de usuário:');
let Post = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: User});

function Fail(Response) {
    console.log(Response);
    console.log("Status code: " + Response.response.status);
	console.log("Mensagem de erro: " + Response.response.data);

    User = prompt('Infelizmente, esse nome já está em uso. Tente outro nome:');
    Post = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: User});

    Post.then(Sucess);
    Post.catch(Fail);
}

Post.catch(Fail);

function Active() {
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name: User});
}

setInterval(Active, 5000);

let Request;

function Refresh() {
    Request = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    Request.then(Update);
}

Refresh();

function Update(Response) {
    for (let i = 0; i < (Response.data).length; i++) {
        let From = Response.data[i].from;
        let To = Response.data[i].to;
        let Text = Response.data[i].text;
        let Type = Response.data[i].type;
        let Time = Response.data[i].time;

        switch(Type) {
            case 'status':
                document.querySelector('.Container').innerHTML += `<div class="System_message"><time>${Time}</time><strong>${From}</strong> ${Text}</div>`;
                break;
            
            case 'message':
                document.querySelector('.Container').innerHTML += `<div class="Public_message"><time>${Time}</time><strong>${From}</strong> para <strong>${To}</strong><span>:</span>${Text}</div>`;
                break;

            case 'private_message':
                document.querySelector('.Container').innerHTML += `<div class="Private_message"><time>${Time}</time><strong>${From}</strong> reservadamente para <strong>${To}</strong><span>:</span>${Text}</div>`;
                break;
        }
    }
}

setInterval(Refresh, 3000);