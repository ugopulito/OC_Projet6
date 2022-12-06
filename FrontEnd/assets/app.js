let galleryImages = document.querySelectorAll(".gallery img");

function testClick(){
    console.log('click OK');
};

for (var i = 0; i < galleryImages.length; i++){
    galleryImages[i].addEventListener("click", testClick)
}

let gallery = document.querySelector('.gallery')
fetch('http://localhost:5678/api/works')
    .then((Response) => {
        return Response.json();
    })
    .then((data) => {
        for (var i = 0; i < data.length; i++){
            let figure = document.createElement('figure');
            let image = document.createElement('img');
            let caption = document.createElement('figcaption');
            caption.innerText = data[i].title;
            image.setAttribute('src', data[i].imageUrl);
            image.setAttribute('crossorigin', 'anonymous');
            image.setAttribute('alt', data[i].title)
            gallery.appendChild(figure);
            figure.appendChild(image);
            figure.appendChild(caption);
        }
    });
