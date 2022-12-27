import * as extFunction from './functions.js';
const newWorkImage = document.getElementById('new-work-image');
const newWorkTitle = document.getElementById('new-work-title');
const newWorkCategory = document.getElementById('new-work-category');

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
            .then((Response) => {
                if(Response.ok){
                    bin.parentNode.style.display = 'none';
                    document.querySelector('.gallery [data-id="'+idWorkToDelete+'"]').style.display = 'none';
                }
            })
        };
    })});
}

function addWork(){
    //Validation du formulaire
    document.getElementById('submit-work').addEventListener('input', function(){
        if((newWorkImage.value != '') && (newWorkCategory.value != '') && (newWorkTitle.value != '')/* Impossible de valider directement le champ avec la l'attribut "required" du html ? */){
            document.getElementById('submit-work-btn').removeAttribute('disabled')
        }
        else{
            document.getElementById('submit-work-btn').setAttribute('disabled', '')
        }
    })
    //Preview de l'image téléchargée
    newWorkImage.addEventListener('change', function(){
        const imagePreview = newWorkImage.files;
        if (imagePreview[0]){
        document.querySelector('#new-work-image-preview').src = URL.createObjectURL(imagePreview[0]);
        document.querySelector('#new-work-image-preview').style.display= 'block';
        document.querySelectorAll('.new-image :not(img)').forEach(item => {
            item.style.display = 'none';
        })
        }
    })
    //Soumission du formulaire
    document.querySelector('#submit-work-btn').addEventListener('click', function(){
        const newWork = {
            "title": newWorkTitle.value,
            "imageUrl": URL.createObjectURL(newWorkImage.files[0]),
            "categoryId": newWorkCategory.value,
        }
        console.log(JSON.stringify(newWork));
        emptyModal();
    })
}

function emptyModal(){
    newWorkTitle.value = '';
    newWorkImage.value = '';
    newWorkCategory.value = '';
    document.querySelector('#new-work-image-preview').src = '#';
    document.querySelector('#new-work-image-preview').style.display= 'none';
    document.querySelectorAll('.new-image :not(img)').forEach(item => {
        item.removeAttribute('style');
    })
}

function initialisationModale(){
    let catList = new Set();
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
            //Ajout liste catégories
            catList.add(item.category.name);
        }
        for (let e of catList){
            const option = document.createElement('option');
            option.setAttribute('value', e);
            option.innerText = e;
            document.querySelector('#new-work-category').appendChild(option)
        }
        deleteWork();
    })
}


if(extFunction.getCookie('token')){
    console.log('Utilisateur connecté');
    document.querySelector('.filters').remove();
    extFunction.displayLogout();
    extFunction.displayEditBtns();
    extFunction.displayTopBar();
    initialisationModale();
    //Ouverture & Fermeture de la modale
    document.querySelector('#works-edit').addEventListener('click', function(){
        document.querySelector('#modale').removeAttribute('style');
    })
    document.querySelector('#modale').addEventListener('click', function(){
        document.querySelector('#modale').style.display = 'none';
    })
    document.querySelector('.close-icon').addEventListener('click', function(){
        document.querySelector('#modale').style.display = 'none';
        emptyModal();
    })
    document.querySelector('.content').addEventListener('click', function(event){
        event.stopPropagation();
    })
    //Navigation dans la modale
    document.querySelector('#add-image-btn').addEventListener('click', function(){
        document.querySelector('.delete-work').style.display = 'none';
        document.querySelector('.add-work').removeAttribute('style');
        location.href = '#add-work';
    })
    document.querySelector('.arrow-icon').addEventListener('click', function(){
        document.querySelector('.add-work').style.display = 'none';
        document.querySelector('.delete-work').removeAttribute('style');
    })
    addWork();
}
