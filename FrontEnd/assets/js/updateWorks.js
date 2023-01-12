import { createError, removeError, getCookie, createMiniatures, addToGallery } from "./utils.js";
import { emptyModal } from "./modale.js";

const newWorkImage = document.getElementById('new-work-image');
const newWorkTitle = document.getElementById('new-work-title');
const newWorkCategory = document.getElementById('new-work-category');

function previewUploaded(){
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
}

function manageNewWork(){
    //Preview de l'image téléchargée
    newWorkImage.addEventListener('change', function(){
        previewUploaded();
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
                //Ajout dans la galerie des projets
                addToGallery(data);
                //Ajout de la miniature dans la modale
                const newBin = createMiniatures(data);
                newBin.addEventListener('click', function(){
                    deleteWork(newBin)
                })
                //Vidage de la modale
                emptyModal();
            })
            .catch((error) => {
                createError(error.message, '#submit-work-btn', 'afterEnd')
            })
    })
}



function deleteWork(e) {
        const idWorkToDelete = e.parentNode.getAttribute('data-id');
        removeError('.delete-work .error');
        e.parentNode.style.display = 'none';
        document.querySelector('.gallery [data-id="'+idWorkToDelete+'"]').style.display = 'none';
        fetch('http://localhost:5678/api/works/' + idWorkToDelete, {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + getCookie('token')
            }
        })
        .then((Response) => {
            if(Response.ok){
                e.parentNode.remove();
                document.querySelector('.gallery [data-id="'+idWorkToDelete+'"]').remove();
            }
        })
        .catch((error) => {
            e.parentNode.removeAttribute('style');
            document.querySelector('.gallery [data-id="'+idWorkToDelete+'"]').removeAttribute('style');
            console.log(error);
            createError(error.message, '.delete-work', 'beforeEnd');
        })

}

export {manageNewWork, deleteWork, newWorkTitle, newWorkImage, newWorkCategory}