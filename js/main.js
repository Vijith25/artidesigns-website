/* ==========================================
ArtiDéSigns Website V7
main.js
========================================== */

/* -----------------------------
Loader
----------------------------- */

window.addEventListener('load',()=>{

document.body.classList.add('loaded');

const loader =
document.getElementById('loader');

if(loader){

loader.classList.add('hide');

setTimeout(()=>{

loader.remove();

},700);

}

});

/* -----------------------------
Smooth Reveal Animation
----------------------------- */

const revealElements =
document.querySelectorAll('.reveal');

if(revealElements.length){

const revealObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add('active');

}

});

},

{
threshold:0.15
}

);

revealElements.forEach(element=>{

revealObserver.observe(element);

});

}

/* -----------------------------
Active Navigation Highlight
----------------------------- */

const sections =
document.querySelectorAll('section[id]');

const navLinks =
document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll',()=>{

let current = '';

sections.forEach(section=>{

const sectionTop =
section.offsetTop - 140;

if(window.scrollY >= sectionTop){

current =
section.getAttribute('id');

}

});

navLinks.forEach(link=>{

link.classList.remove('active');

if(
link.getAttribute('href') ===
'#' + current
){

link.classList.add('active');

}

});

});

/* -----------------------------
Navbar Enhancement
----------------------------- */

const navbar =
document.querySelector('.navbar');

window.addEventListener('scroll',()=>{

if(!navbar) return;

if(window.scrollY > 50){

navbar.style.background =
'rgba(0,0,0,.95)';

navbar.style.backdropFilter =
'blur(18px)';

}else{

navbar.style.background =
'rgba(0,0,0,.78)';

navbar.style.backdropFilter =
'blur(18px)';

}

});

/* -----------------------------
Current Year Auto Update
----------------------------- */

const yearElement =
document.getElementById('year');

if(yearElement){

yearElement.textContent =
new Date().getFullYear();

}

/* -----------------------------
Future Portfolio Hook
----------------------------- */

window.ArtiPortfolio = {

status:'ready',

version:'v7',

message:
'Portfolio galleries reserved for future integration.'

};

console.log(window.ArtiPortfolio);

/* -----------------------------
Future Digital Design Hook
----------------------------- */

window.ArtiDesignStudio = {

status:'ready',

version:'v7',

message:
'Digital Design Studio reserved for future integration.'

};

console.log(window.ArtiDesignStudio);

/* -----------------------------
Future AI Assistant Hook
----------------------------- */

window.ArtiAI = {

status:'reserved',

version:'future',

message:
'Arti AI Assistant reserved for future integration.'

};

console.log(window.ArtiAI);

/* -----------------------------
Console Signature
----------------------------- */

console.log(
'%cArtiDéSigns',
'color:#ff1414;font-size:20px;font-weight:bold;'
);

console.log(
'Design Is Intelligence Made Visible.'
);
