'use strict';

function scrollIntoView(selector){
    const scrollTo=document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});
}

// Transparent navbar
const navbar=document.querySelector('#navbar');
const navbarHeight=navbar.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
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

    scrollIntoView(link);
});

//if "contact me" button is clicked, Scroll to Contact Section

const contactBtn=document.querySelector('.home__contact');

contactBtn.addEventListener('click',()=>{
    scrollIntoView("#contact");
});

//Make home slowly fade to transparent as the window scrolls down
const home=document.querySelector('.home__container');
const homeHeight=home.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
    home.style.opacity=1-window.scrollY/homeHeight;
});

//Arrow up Button
const arrowbtn=document.querySelector('.arrowup_btn');

arrowbtn.addEventListener('click',()=>{
    scrollIntoView('#home');
});

document.addEventListener('scroll',()=>{
    if(window.scrollY>=homeHeight/2){
        arrowbtn.classList.add('visible');
    }
    else{
        arrowbtn.classList.remove('visible');
    }
});

const workBtnContainer=document.querySelector('.work__categories');
const projectsContainer=document.querySelector('.work__projects');
const projects=document.querySelectorAll('.project');

workBtnContainer.addEventListener('click',(e)=>{
    //span 부분에는 data-filter가 포함되어 있지 않아서 filter가 unsigned로 저장된다.
    //이것을 방지하기 위해 e.target.dataset.filter==unsigned(false)라면 부모의 filter를 가져올 수 있도록 한다.
    const filter=e.target.dataset.filter || e.target.parentNode.dataset.filter;
    
    projects.forEach((project)=>{
        const type=project.dataset.type;
        
        if(filter==="*"||filter===type){
            project.classList.remove("invisible");
        }
        else{
            project.classList.add("invisible");
        }
    })
});