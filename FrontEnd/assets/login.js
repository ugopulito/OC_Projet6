let username = document.getElementById('email');
let password = document.getElementById('password');




function login(e){
    e.preventDefault();
    let user = {
        "email" : username.value,
        "password" : password.value
    }
    console.log('Connexion avec le user :'+JSON.stringify(user));
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(function(response){
        /* return response.json() */
        return response.json();
    })
    .then(function(data){
        console.log(data.token);
    })
    .catch(function (error){
        console.log(error);
    })
}

document.querySelector('#submit-login').addEventListener('submit', login)