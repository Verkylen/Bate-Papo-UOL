let User = prompt('Digite seu nome:');
let Post = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: User});

function Sucess(Response) {
    console.log('Ok');
    console.log(Response.data);
}

function Fail(Response) {
    console.log(Response);
    console.log("Status code: " + Response.response.status);
	console.log("Mensagem de erro: " + Response.response.data);

    User = prompt('Infelizmente, esse nome já está em uso. Digite outro nome:');
    Post = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: User});

    Post.then(Sucess);
    Post.catch(Fail);
}

Post.then(Sucess);
Post.catch(Fail);

function Refresh() {
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name: User});
    console.log('Refresh');
}

setInterval(Refresh, 5000);