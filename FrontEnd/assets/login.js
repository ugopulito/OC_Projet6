//Fonction de login 

function login(e){
    e.preventDefault();
    const username = document.getElementById('email');
    const password = document.getElementById('password');
    const user = {
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
        throw userError = new Error('Erreur dans l\'identifiant ou le mot de passe');
        }
        else{
        throw serverError = new Error('Il semble y avoir une erreur de notre côté. Merci de réessayer ultérieurement')
        }
    })
    .then(function(data){
        document.cookie = 'token='+data.token;
        window.location.replace('index.html')
    })
    .catch(function(err){
        if(err.message == 'Failed to fetch'){
            err.message = 'Erreur de connexion au serveur'
        }
        console.error(err.message);
        createError(err);
    })
}

function createError(e){
    const error = document.createElement('div');
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