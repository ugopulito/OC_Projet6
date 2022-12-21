let gallery, filters, filtersList, categories, figure, figures, image, caption, activeFilter, button;
gallery = document.querySelector('.gallery');
filtersList = document.querySelector('.filters');
categories = new Set();

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
            figure = document.createElement('figure');
            image = document.createElement('img');
            caption = document.createElement('figcaption');
            gallery.appendChild(figure);
            figure.appendChild(image);
            figure.appendChild(caption);
            figure.dataset.category = item.category.name;
            figure.dataset.id = item.id;
            caption.innerText = item.title;
            image.setAttribute('src', item.imageUrl);
            image.setAttribute('crossorigin', 'anonymous');
            image.setAttribute('alt', item.title);
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
