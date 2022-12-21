function getCookie(name){
    const data = '; '+document.cookie;
    const cookies = data.split('; '+name+'=').pop();
    const value = cookies.split('; ').shift();
    return value
}
function logout(){//fonction de Logout OK ?
    document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    location.reload()
}
function displayLogoutBtn(){
    document.querySelector('nav li:nth-child(3)').textContent = 'logout';
    document.querySelector('nav li:nth-child(3)').addEventListener('click', logout);
}
function displayEditTopBar(){
    const topBar = document.createElement('div');
    const editMsg = document.createElement('p');
    const editButton = document.createElement('button');
    topBar.className = 'topbar'
    editMsg.innerHTML = '<svg class="edit-icon"><use href="./assets/icons/edit-icon.svg#edit-icon-white"></use></svg>Mode édition';
    editButton.textContent = "publier les changements";
    document.querySelector('html').insertBefore(topBar, document.querySelector('body'));
    topBar.appendChild(editMsg);
    topBar.appendChild(editButton);
}
function initEditBtn(constName, idName){
    constName.classList.add('edit-btn', idName);
    constName.id = idName;
    constName.innerHTML = '<svg class="edit-icon"><use href="./assets/icons/edit-icon.svg#edit-icon-black"></use></svg>Modifier';
}
function displayEditBtns(){
    const introEditBtn = document.createElement('button');
    const heroImgEditBtn = document.createElement('button');
    const worksEditBtn = document.createElement('button');
    initEditBtn(introEditBtn, 'intro-edit')
    document.querySelector('#introduction article').insertBefore(introEditBtn, document.querySelector('h2'));
    initEditBtn(heroImgEditBtn, 'hero-img-edit');
    document.querySelector('#introduction figure img').insertAdjacentElement('afterend', heroImgEditBtn);
    initEditBtn(worksEditBtn, 'works-edit');
    document.querySelector('#portfolio h2').insertAdjacentElement('afterend', worksEditBtn);
}
function getMiniatures(){
    fetch('http://localhost:5678/api/works')
    .then((Response) => {
        return Response.json();
    })
    .then((data) => {
        //Création des miniatures
        for (let item of data){
            const miniature = document.createElement('div');
            miniature.dataset.id = item.id;
            miniature.className = 'miniature';
            document.querySelector('.miniatures').appendChild(miniature);
            //Vignettes
            const miniatureImage = document.createElement('img');
            miniatureImage.setAttribute('src', item.imageUrl);
            miniatureImage.setAttribute('crossorigin', 'anonymous');
            miniatureImage.setAttribute('alt', item.title);
            miniature.appendChild(miniatureImage);
            //Corbeille
            const bin = document.createElement('div');
            bin.className = 'delete-icon';
            miniature.appendChild(bin);
        }
        deleteWork();
    })
}
function deleteWork() {
    const bins = document.querySelectorAll('.delete-icon');
    bins.forEach(bin => {bin.addEventListener('click', function(){
        console.log(bin.parentNode.getAttribute('data-id'));
        bin.parentNode.style.display = 'none'
    })});
}

function initModale(){
    //fenêtre de la modale et background
    const modale = document.createElement('div');
    const content = document.createElement('div');
    modale.className = 'modale';
    modale.id='modale';
    content.className = 'content';
    modale.appendChild(content);
    modale.style.display = 'none';
    document.querySelector('body').insertAdjacentElement('beforebegin', modale)
    //icone de fermeture
    const cross = document.createElement('i');
    cross.className = 'close-icon';
    content.appendChild(cross);
    //contenu de la modale
    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = 'Galerie photo';
    content.appendChild(title);
        //Miniatures des projets
    const miniatures = document.createElement('div');
    miniatures.className = 'miniatures';
    content.appendChild(miniatures);
    getMiniatures();
        //Ligne de séparation
    const breakline = document.createElement('div');
    breakline.className = 'breakline';
    content.appendChild(breakline);
        //Bouton d'ajout de travaux
    const addWorkBtn = document.createElement('button'); 
    addWorkBtn.classList.add('btn', 'add-work-btn');
    addWorkBtn.id = 'add-work-btn';
    addWorkBtn.textContent = 'Ajouter une photo';
    content.appendChild(addWorkBtn);
        //Bouton de suppression de la galerie
    const deleteGallery = document.createElement('button');
    deleteGallery.className = 'delete-gallery-btn';
    deleteGallery.textContent = 'Supprimer la galerie';
    content.appendChild(deleteGallery);
}
if(getCookie('token')){
    console.log('Utilisateur connecté');
    document.querySelector('.filters').remove();
    displayLogoutBtn();
    displayEditTopBar();
    displayEditBtns();
    initModale();
    document.querySelector('#works-edit').addEventListener('click', function(){
        document.querySelector('#modale').removeAttribute('style');
    })
    document.querySelector('#modale').addEventListener('click', function(){
        document.querySelector('#modale').style.display = 'none';
    })
    document.querySelector('.close-icon').addEventListener('click', function(){
        document.querySelector('#modale').style.display = 'none';
    })
    document.querySelector('.content').addEventListener('click', function(event){
        event.stopPropagation();
    })
}
