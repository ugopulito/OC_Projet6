import * as extFunction from './functions.js';


function displayTopBar(){
    document.querySelector('.topbar').removeAttribute('style');
    document.querySelector('header').classList.add('header-edit-mode')
}

function deleteWork() {
    document.querySelectorAll('.delete-icon').forEach(bin => {bin.addEventListener('click', function(){
        const idWorkToDelete = bin.parentNode.getAttribute('data-id');
        if(confirm('Voulez-vous supprimer ce projet ?')){
            /* console.log(idWorkToDelete); */
            fetch('http://localhost:5678/api/works/' + idWorkToDelete, {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + extFunction.getCookie('token')
            }
            })
        };
    })});
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


if(extFunction.getCookie('token')){
    console.log('Utilisateur connecté');
    document.querySelector('.filters').remove();
    extFunction.displayLogout();
    extFunction.displayEditBtns();
    displayTopBar();
    getMiniatures();
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
