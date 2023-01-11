import { createError, removeError, getCookie, createMiniatures } from "./utils.js";
import { emptyModal } from "./modale.js";

const newWorkImage = document.getElementById('new-work-image');
const newWorkTitle = document.getElementById('new-work-title');
const newWorkCategory = document.getElementById('new-work-category');
let bins;

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
        removeError('.add-work .error');
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
                //Ajout dans la galerie
                const newFigure = document.createElement('figure');
                const newImage = document.createElement('img');
                const newCaption = document.createElement('figcaption');
                document.querySelector('.gallery').appendChild(newFigure);
                newFigure.appendChild(newImage);
                newFigure.appendChild(newCaption);
                newFigure.dataset.id = data.id;
                newCaption.innerText = data.title;
                newImage.setAttribute('src', data.imageUrl);
                newImage.setAttribute('crossorigin', 'anonymous');
                newImage.setAttribute('alt', data.title);
                createMiniatures(data);
                deleteWork();
                emptyModal();
            })
            .catch((error) => {
                createError(error.message, '#submit-work-btn', 'afterEnd')
            })
    })
}

function deleteWork() {
    bins = document.querySelectorAll('.delete-icon');
    bins.forEach(bin => {bin.addEventListener('click', function(){
        const idWorkToDelete = bin.parentNode.getAttribute('data-id');
        removeError('.delete-work .error');
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
    })});
}

export {addWork, deleteWork, newWorkTitle, newWorkImage, newWorkCategory}