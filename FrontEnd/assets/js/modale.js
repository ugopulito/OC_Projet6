import {initBins, newWorkCategory, newWorkImage, newWorkTitle} from './updateWorks.js';
import { createMiniatures } from './utils.js';



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
            createMiniatures(item);
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
        initBins();
    })
}

export {initialisationModale, emptyModal}