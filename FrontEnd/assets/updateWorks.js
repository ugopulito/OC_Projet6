import {getCookie, displayEditBtns, displayLogout, displayTopBar, createError, removeError} from './utils.js';

const newWorkImage = document.getElementById('new-work-image');
const newWorkTitle = document.getElementById('new-work-title');
const newWorkCategory = document.getElementById('new-work-category');



function deleteWork() {
    document.querySelectorAll('.delete-icon').forEach(bin => {bin.addEventListener('click', function(){
        const idWorkToDelete = bin.parentNode.getAttribute('data-id');
        removeError('.delete-work .error');
        if(confirm('Voulez-vous supprimer ce projet ?')){
            //Masquage du projet supprimé pour UX en attente de la réponse du server
            bin.parentNode.style.display = 'none';
            document.querySelector('.gallery [data-id="'+idWorkToDelete+'"]').style.display = 'none';
            fetch('http://localhost:5678/api/works/' + idWorkToDelete, {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + getCookie('token')
            }
            })
            .then((Response) => {
                if(Response.ok){
                    bin.parentNode.remove();
                    document.querySelector('.gallery [data-id="'+idWorkToDelete+'"]').remove();
                }
            })
            .catch((error) => {
                bin.parentNode.removeAttribute('style');
                    document.querySelector('.gallery [data-id="'+idWorkToDelete+'"]').removeAttribute('style');
                    console.log(error);
                    createError(error.message, '.delete-work', 'beforeEnd');
            })
        };
    })});
}

function addWork(){
    //Preview de l'image téléchargée
    newWorkImage.addEventListener('change', function(){
        removeError('#submit-work .error');
        const imagePreview = newWorkImage.files;
        if (imagePreview[0]){
        document.querySelector('#new-work-image-preview').src = URL.createObjectURL(imagePreview[0]);
        document.querySelectorAll('.new-image :not(img)').forEach(item => {
            item.style.display = 'none';
        })
        document.querySelector('#new-work-image-preview').style.display= 'block';
        document.querySelector('#new-work-image').style.display= 'block';
        }
    })
    //Soumission du formulaire
    document.querySelector('#submit-work').addEventListener('submit', function(e){
        e.preventDefault();
        const newWorkFormData = new FormData();
        newWorkFormData.append("title", newWorkTitle.value);
        newWorkFormData.append("category", newWorkCategory.value);
        newWorkFormData.append("image", newWorkImage.files[0]);
            fetch('http://localhost:5678/api/works', {
                method: 'POST', 
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + getCookie('token'),
                },
                body: newWorkFormData
            })
            .then((response) => {
                if(response.ok)
                {return response.json();}
            })
            .then ((data) => {
                const newFigure = document.createElement('figure');
                const newImage = document.createElement('img');
                const newCaption = document.createElement('figcaption');
                document.querySelector('.gallery').appendChild(newFigure);
                newFigure.appendChild(newImage);
                newFigure.appendChild(newCaption);
                newFigure.dataset.id = data.categoryId;
                newCaption.innerText = data.title;
                newImage.setAttribute('src', data.imageUrl);
                newImage.setAttribute('crossorigin', 'anonymous');
                newImage.setAttribute('alt', data.title);
            })
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
    fetch('http://localhost:5678/api/works')
    .then((Response) => {
        return Response.json();
    })
    .then((data) => {
        //Création des miniatures
        const nonuniqueCategories = [];
        for (const item of data){
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
            nonuniqueCategories.push({
                'id' : item.category.id,
                'name' : item.category.name
            })
        }
        const uniqueCategories = nonuniqueCategories.filter((obj, index, self) => {
            return index === self.findIndex(o => o.id === obj.id && o.name === obj.name);
          });
        for (const category of uniqueCategories){
            const option = document.createElement('option');
            option.setAttribute('value', category.id);
            option.innerText = category.name;
            document.querySelector('#new-work-category').appendChild(option)
        }
        deleteWork();
    })
}


if(getCookie('token')){
    console.log('Utilisateur connecté');
    document.querySelector('.filters').remove();
    displayLogout();
    displayEditBtns();
    displayTopBar();
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
