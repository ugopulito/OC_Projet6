function getCookie(name){
    let data = '; '+document.cookie;
    let cookies = data.split('; '+name+'=').pop();
    let value = cookies.split('; ').shift();
    return value
}
function logout(){
    document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    location.reload()
}
function displayTopBarEditMode(){
    const topBar = document.createElement('div');
    const editMsg = document.createElement('p');
    const editButton = document.createElement('button');
    topBar.className = 'topbar'
    editMsg.innerHTML = '<i class="edit-icon"></i>Mode édition';
    editButton.textContent = "publier les changements";
    document.querySelector('html').insertBefore(topBar, document.querySelector('body'));
    topBar.appendChild(editMsg);
    topBar.appendChild(editButton);
}
function displayButtonEditMode(){
    editButton = document.createElement('button');
    editButton.className = 'edit'
    editButton.innerHTML='<i class="edit-icon"></i>Modifier';
    document.querySelector('#introduction article').insertBefore(editButton, document.querySelector('h2'));
}
if(getCookie('token')){
    console.log('Utilisateur connecté');
    document.querySelector('nav li:nth-child(3)').textContent = 'logout';
    document.querySelector('nav li:nth-child(3)').addEventListener('click', logout);
    displayTopBarEditMode();
    displayButtonEditMode();
}
