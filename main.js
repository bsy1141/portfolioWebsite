'use strict';

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

    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);
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
    const active=document.querySelector('.category__btn.active');
    active.classList.remove('active');

    const target= e.target.nodeName==="BUTTON" ? e.target : e.target.parentNode;
    const filter=target.dataset.filter;

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
    },300);
    
});

//1. 모든 섹션 요소들을 가지고 온다
//2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionIds=[
    '#home',
    '#about',
    "#skills",
    '#work',
    '#testimonial',
    '#contact',
];

const sections=sectionIds.map(id=>document.querySelector(id));
const navItems=sectionIds.map(id=>document.querySelector(`[data-link="${id}"]`));

//이미 선택되어 있는 메뉴를 가리키는 변수 selectedNavItem
let selectedNavItem=navItems[0];
//콜백함수 내가 아닌 전역변수로 만든 이유는 실제 메뉴 선택은 콜백함수 내에서가 아니라
//스크롤링 시 일어날 수 있게 하기 위함
let selectedNavIndex=0;
//선택된 메뉴는 active클래스 제거, selected라는 인자는 active 클래스를 추가해서 
//활성화되게 만들어주는 함수 selectNavItem
function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem=selected;
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector){
    const scrollTo=document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions={
    root:null,
    rootMargin:'0px',
    threshold:0.3,
};

//navbar 활성화 방안 : 
//특정 섹션이 '나가게 되면'(!entry.isIntersecting) 다음 섹션이 활성화되는 것으로 설정
const observerCallback=(entries,observer)=>{
    entries.forEach(entry=>{
       if(!entry.isIntersecting && entry.intersectionRatio>0){
           //sectionIds 배열에서 빠져나가고 있는 entry의 id값에 해당되는 인덱스를 저장하는 변수 index
           const index=sectionIds.indexOf(`#${entry.target.id}`);
           if(entry.boundingClientRect.y<0){
               selectedNavIndex=index+1;
           }else{
               selectedNavIndex=index-1;
           }
       }
    });
}

const observer=new IntersectionObserver(observerCallback,observerOptions);

sections.forEach(section=>observer.observe(section));

//scroll=브라우저에서 발생하는 스크롤링 자체에서 발생하는 이벤트
//wheel=사용자가 스스로 스크롤링할 때 발생하는 이벤트
window.addEventListener('wheel',()=>{
    if(window.scrollY===0){
        selectedNavIndex=0;
    }else if(Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
        selectedNavIndex=navItems.length-1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})