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

//Scroll to section & active menu
const navbarMenu=document.querySelector('.navbar__menu');
const navbarMenuItems=document.querySelectorAll('.navbar__menu__item');

navbarMenu.addEventListener('click',(event)=>{
    const target=event.target;
    const link=target.dataset.link;
    
    if(link==null){
        return;
    }

    scrollIntoView(link);
    navbarMenu.classList.remove('open');

    navbarMenuItems.forEach((item)=>{
        if(item===target){
            item.classList.add('active');
        }
        else item.classList.remove('active');
    });

});

//when toggle btn is clicked, show navbar menu
const toggleBtn=document.querySelector('.navbar__toggle_btn');

toggleBtn.addEventListener('click',()=>{
    navbarMenu.classList.toggle('open');
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

//Project Filtering & Animation
const workBtnContainer=document.querySelector('.work__categories');
//const workBtn=document.querySelectorAll('.category__btn');
const projectsContainer=document.querySelector('.work__projects');
const projects=document.querySelectorAll('.project');

workBtnContainer.addEventListener('click',(e)=>{
    //span 부분에는 data-filter가 포함되어 있지 않아서 filter가 unsigned로 저장된다.
    //이것을 방지하기 위해 e.target.dataset.filter==unsigned(false)라면 부모의 filter를 가져올 수 있도록 한다.
    const filter=e.target.dataset.filter || e.target.parentNode.dataset.filter;
    
    const active=document.querySelector('.category__btn.active');
    active.classList.remove('active');

    const target= e.target.nodeName==="BUTTON" ? e.target : e.target.parentNode;
    target.classList.add('active');
    /*
    workBtn.forEach((btn)=>{
        if(btn===target){
            btn.classList.add('active');
        }
        else btn.classList.remove('active');
    });
    */
    
    
    projectsContainer.classList.add("anim-out");
    setTimeout(function(){
        projects.forEach((project)=>{
        const type=project.dataset.type;
        
        if(filter==="*"||filter===type){
            project.classList.remove("invisible");
        }
        else{
            project.classList.add("invisible");
        }
    });
        projectsContainer.classList.remove("anim-out");
    },300)
});


