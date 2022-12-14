
function login(e){
    e.preventDefault();
    let username = document.getElementById('email');
    let password = document.getElementById('password');
    let user = {
        "email" : username.value,
        "password" : password.value
    }
    /* console.log('Connexion avec le user :'+JSON.stringify(user)); */
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(function(response){
        if(response.ok){
        return response.json();
        }
    })
    .then(function(data){
        document.cookie = 'token='+data.token;
        window.location.assign('index.html')
    })
    .catch(function(err){
        console.error('Une erreur est survenue merci de réessayer');
        console.error(err);
        if(!document.querySelector('.error')){
            createError();
        }
    })
}

document.querySelector('#submit-login').addEventListener('submit', login)

function createError(){

    let error = document.createElement('div');
    error.classList.add('error');
    error.innerText = 'Erreur de connexion, merci de réessayer';
    document.querySelector('#password').insertAdjacentElement('afterend', error);
}