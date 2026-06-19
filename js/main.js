/* ==========================================
ArtiDéSigns Website V5
main.js
========================================== */

/* -----------------------------
Loader
----------------------------- */

window.addEventListener('load',()=>{

const loader =
document.getElementById('loader');

if(loader){

loader.classList.add('hide');

setTimeout(()=>{

loader.remove();

},600);

}

});

/* -----------------------------
Smooth Reveal Animation
----------------------------- */

const revealElements =
document.querySelectorAll('.reveal');

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

if(window.scrollY > 50){

navbar.style.background =
'rgba(0,0,0,.95)';

navbar.style.backdropFilter =
'blur(18px)';

}else{

navbar.style.background =
'rgba(0,0,0,.88)';

navbar.style.backdropFilter =
'blur(14px)';

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

version:'v5',

message:
'Portfolio galleries reserved for future integration.'

};

console.log(window.ArtiPortfolio);

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
Hero Logo Parallax
----------------------------- */

const heroLogo =
document.querySelector('.hero-main-logo');

window.addEventListener('mousemove',(e)=>{

if(!heroLogo) return;

const x =
(window.innerWidth / 2 - e.clientX)
/ 80;

const y =
(window.innerHeight / 2 - e.clientY)
/ 80;

heroLogo.style.transform =
`translate(${x}px, ${y}px)`;

});

/* -----------------------------
Console Signature
----------------------------- */

console.log(
'%cArtiDéSigns',
'color:#ff0f0f;font-size:20px;font-weight:bold;'
);

console.log(
'Design Is Intelligence Made Visible.'
);
