'use strict';

// Transparent navbar
const navbar=document.querySelector('#navbar');
const navbarHeight=navbar.getBoundingClientRect().height;

window.addEventListener('scroll',()=>{
    if(window.scrollY>navbarHeight){
        navbar.classList.add('navbar--dark');
    }
    else{
        navbar.classList.remove('navbar--dark');
    }
})

//Scroll to section
const navbarMenu=document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click',(event)=>{
    const target=event.target;
    const link=target.dataset.link;
    
    if(link==null){
        return;
    }

    const scrollTo=document.querySelector(link);
    scrollTo.scrollIntoView({behavior:"smooth"});
});






