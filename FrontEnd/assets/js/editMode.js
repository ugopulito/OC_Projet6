import {getCookie, displayEditBtns, displayLogout, displayTopBar} from './utils.js';
import {initModal, emptyModal} from './modale.js';
import { manageNewWork } from './updateWorks.js';

if(getCookie('token')){
    console.log('Utilisateur connecté');
    //Initialisation du mode édition
    document.querySelector('.filters').remove();
    displayLogout();
    displayEditBtns();
    displayTopBar();
    //Modale
    initModal();
    //Gestion des nouveaux projets
    manageNewWork();
    //Ouverture & Fermeture de la modale
    document.querySelector('#works-edit').addEventListener('click', function(){
        document.querySelector('#modale').removeAttribute('style');
    })
    document.querySelector('#modale').addEventListener('click', function(){
        document.querySelector('#modale').style.display = 'none';
    })
    document.querySelector('.close-icon').addEventListener('click', function(){
        document.querySelector('.add-work').style.display = 'none';
        document.querySelector('.delete-work').removeAttribute('style');
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
