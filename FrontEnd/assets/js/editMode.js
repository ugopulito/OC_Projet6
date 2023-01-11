import {getCookie, displayEditBtns, displayLogout, displayTopBar} from './utils.js';
import {initialisationModale, emptyModal} from './modale.js';
import { addWork } from './updateWorks.js';








if(getCookie('token')){
    console.log('Utilisateur connecté');
    document.querySelector('.filters').remove();
    displayLogout();
    displayEditBtns();
    displayTopBar();
    initialisationModale();
    addWork();
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
}
