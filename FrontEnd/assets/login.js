//Fonction de login 
import {createError, removeError} from './functions.js';

function login(e){
    e.preventDefault();
    const username = document.getElementById('email');
    const password = document.getElementById('password');
    const user = {
        "email" : username.value,
        "password" : password.value
    }
    removeError('#submit-login .error');
    /* console.log('Connexion avec le user :'+JSON.stringify(user)); */
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response) => {
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
    .then((data) => {
        document.cookie = 'token='+data.token;
        window.location.replace('index.html')
    })
    .catch((err) => {
        if(err.message == 'Failed to fetch'){
            err.message = 'Erreur de connexion au serveur'
        }
        console.error(err.message);
        createError(err, '#password', 'afterEnd');
    })
}
    
    document.querySelector('#submit-login').addEventListener('submit', login)
    document.querySelector('#submit-login').addEventListener('input', function(){removeError('#submit-login .error')})