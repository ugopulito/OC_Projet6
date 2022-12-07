let gallery = document.querySelector('.gallery')
let filters = document.querySelector('.filters')
let categories = new Set();
function initFilters(text){
    let button = document.createElement('button');
    filters.appendChild(button);
    button.classList.add('filter');
    button.innerText = text;
}
function changeActiveFilter(){
    let activeFilter = document.querySelector('.filter.selected');
    if (this.classList.contains('selected')){
        console.log('filtre déjà sélectionné')
    }
    else{
        activeFilter.classList.remove('selected');
        this.classList.add('selected');
        activeFilter = this;
        console.log('filtre sélectionné : '+ activeFilter.innerText);
    }
}
fetch('http://localhost:5678/api/works')
    .then((Response) => {
        return Response.json();
    })
    .then((data) => {
        //Création de la galerie
        for (var i = 0; i < data.length; i++){
            let figure = document.createElement('figure');
            let image = document.createElement('img');
            let caption = document.createElement('figcaption');
            gallery.appendChild(figure);
            figure.appendChild(image);
            figure.appendChild(caption);
            caption.innerText = data[i].title;
            image.setAttribute('src', data[i].imageUrl);
            image.setAttribute('crossorigin', 'anonymous');
            image.setAttribute('alt', data[i].title);
            categories.add(data[i].category.name);
        }
        //Création des filtres
        initFilters('Tous');
        filters.firstElementChild.classList.add('selected');
        for (let category of categories){
            initFilters(category);
        }
        let filter = document.querySelectorAll('.filter');
        filter.forEach(item => {item.addEventListener('click', changeActiveFilter)});
    });