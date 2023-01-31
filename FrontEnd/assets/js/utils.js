import { deleteWork } from "./updateWorks.js";

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

function createMiniatures(e){
    const miniature = document.createElement('div');
    miniature.dataset.id = e.id;
    miniature.className = 'miniature';
    document.querySelector('.miniatures').appendChild(miniature);
    //Vignettes
    const miniatureImage = document.createElement('img');
    miniatureImage.setAttribute('src', e.imageUrl);
    miniatureImage.setAttribute('crossorigin', 'anonymous');
    miniatureImage.setAttribute('alt', e.title);
    miniature.appendChild(miniatureImage);
    //Corbeille
    const bin = document.createElement('div');
    bin.className = 'delete-icon';
    miniature.appendChild(bin);
    return bin
}

function initBins(){
    const bins = document.querySelectorAll('.delete-icon');
    bins.forEach(bin => {bin.addEventListener('click', function(){
        deleteWork(bin);
    })});
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

function addToGallery(e){
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const caption = document.createElement('figcaption');
    const gallery = document.querySelector('.gallery');
    gallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(caption);
    try{
        figure.dataset.category = e.category.name;
    }
    catch (error) {
        console.log(error + ' >> Le nom de la catégorie n\'est pas disponible pour le moment.');
    }
    figure.dataset.id = e.id;
    caption.innerText = e.title;
    image.setAttribute('src', e.imageUrl);
    image.setAttribute('crossorigin', 'anonymous');
    image.setAttribute('alt', e.title);
}



export {displayTopBar, displayLogout, getCookie, displayEditBtns, removeError, createError, createMiniatures, initBins, addToGallery};