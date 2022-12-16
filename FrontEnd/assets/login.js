//Fonction de login 

function login(e){
    e.preventDefault();
    let username = document.getElementById('email');
    let password = document.getElementById('password');
    let user = {
        "email" : username.value,
        "password" : password.value
    }
    removeError();
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
        else if(response.status >= 400 && response.status < 500) {
        throw userError = new Error('Erreur d\'identifiant ou de mot de passe. Merci de réessayer');
        }
        else{
        throw serverError = new Error('Il semble y avoir une erreur de notre côté. Merci de réessayer ultérieurement')
        }
    })
    .then(function(data){
        document.cookie = 'token='+data.token;
        window.location.assign('index.html')
    })
    .catch(function(err){
        console.error(err.message);
        createError(err);
    })
}

function createError(e){
    let error = document.createElement('div');
    error.classList.add('error');
    error.innerText = e.message;
    document.querySelector('#password').insertAdjacentElement('afterend', error);
}

function removeError(){
    if(document.querySelector('.error')){
        document.querySelector('.error').remove();
    }
}
    
    document.querySelector('#submit-login').addEventListener('submit', login)
    document.querySelector('#submit-login').addEventListener('input', removeError)