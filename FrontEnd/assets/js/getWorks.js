import { addToGallery } from "./utils.js";

let filters, figures, activeFilter, button;
const filtersList = document.querySelector('.filters');
const categories = new Set();

function initFilters(text){
    button = document.createElement('button');
    filtersList.appendChild(button);
    button.classList.add('filter');
    button.innerText = text;
}
function changeActiveFilter(){
    if (!this.classList.contains('selected')){
        activeFilter.classList.remove('selected');
        this.classList.add('selected');
        activeFilter = this;
    }
}
function filterProjects(){
    for (let item of figures){
        //Affichage de tous les projets
        item.removeAttribute('style');
        //Puis filtrage selon la catégorie sélectionnée
        if(activeFilter.innerText !== 'Tous' && item.dataset.category !== activeFilter.innerText){
            item.style.display = 'none';
        }
    }
}

fetch('http://localhost:5678/api/works')
    .then((Response) => {
        return Response.json();
    })
    .then((data) => {
        //Création de la galerie
        for (let item of data){
            addToGallery(item);
        }
        //Création des filtres
        for (let item of data){
            categories.add(item.category.name);
        }
        initFilters('Tous');
        filtersList.firstElementChild.classList.add('selected');
        activeFilter = document.querySelector('.filter.selected');
        for (let item of categories){
            initFilters(item);
        }
        filters = document.querySelectorAll('.filter');
        filters.forEach(filter => {filter.addEventListener('click', changeActiveFilter)});
        //Filtrage des projets
        figures = document.querySelectorAll('.gallery figure');
        filters.forEach(filter => {filter.addEventListener('click', filterProjects)});
    })
