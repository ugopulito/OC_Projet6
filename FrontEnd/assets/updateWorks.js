function getCookie(name){
    let data = '; '+document.cookie;
    let cookies = data.split('; '+name+'=').pop();
    let value = cookies.split('; ').shift();
    return value
}
function logout(){
    document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.reload
}

if(getCookie('token')){
    console.log('Utilisateur connecté');
    document.querySelector('nav li:nth-child(3)').textContent = 'logout';
    document.querySelector('nav li:nth-child(3)').addEventListener('click', logout)
}