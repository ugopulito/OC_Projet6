function displayTopBar(){
    document.querySelector('.topbar').removeAttribute('style');
    document.querySelector('header').classList.add('header-edit-mode')
}

function displayLogout(){
    document.querySelector('#login-out').textContent = 'logout';
    document.querySelector('#login-out').addEventListener('click', function logout(){
        document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        location.reload()
    });
}

function getCookie(name){
    const data = '; '+document.cookie;
    const cookies = data.split('; '+name+'=').pop();
    const value = cookies.split('; ').shift();
    return value
}

function displayEditBtns(){
    function createEditBtn(constName, idName){
        constName.classList.add('edit-btn', idName);
        constName.id = idName;
        constName.innerHTML = '<svg class="edit-icon"><use href="./assets/icons/edit-icon.svg#edit-icon-black"></use></svg>Modifier';}
    const introEditBtn = document.createElement('button');
    const heroImgEditBtn = document.createElement('button');
    const worksEditBtn = document.createElement('button');
    createEditBtn(introEditBtn, 'intro-edit')
    document.querySelector('#introduction article').insertBefore(introEditBtn, document.querySelector('h2'));
    createEditBtn(heroImgEditBtn, 'hero-img-edit');
    document.querySelector('#introduction figure img').insertAdjacentElement('afterend', heroImgEditBtn);
    createEditBtn(worksEditBtn, 'works-edit');
    document.querySelector('#portfolio h2').insertAdjacentElement('afterend', worksEditBtn);
}

function createError(message, target, anchor){
    const error = document.createElement('div');
    error.classList.add('error');
    error.innerText = message
    document.querySelector(target).insertAdjacentElement(anchor, error);
}

function removeError(target){
    if(document.querySelector(target)){
        document.querySelector(target).remove();
    }
}

export {displayTopBar, displayLogout, getCookie, displayEditBtns, removeError, createError};