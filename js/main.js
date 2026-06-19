/* ==========================================
ArtiDéSigns Website v2
main.js
========================================== */

/* -----------------------------
Smooth Reveal Animation
----------------------------- */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(

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

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll',()=>{

let current = '';

sections.forEach(section=>{

const sectionTop = section.offsetTop - 120;
const sectionHeight = section.offsetHeight;

if(pageYOffset >= sectionTop){

current = section.getAttribute('id');

}

});

navLinks.forEach(link=>{

link.classList.remove('active');

if(link.getAttribute('href') === '#' + current){

link.classList.add('active');

}

});

});

/* -----------------------------
Navbar Background Enhancement
----------------------------- */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll',()=>{

if(window.scrollY > 50){

navbar.style.background =
'rgba(0,0,0,.95)';

}else{

navbar.style.background =
'rgba(0,0,0,.90)';

}

});

/* -----------------------------
Portfolio Placeholder Future Hook
----------------------------- */

console.log(
'ArtiDéSigns Portfolio Ready'
);

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
Current Year Auto Update
----------------------------- */

const yearElement =
document.getElementById('year');

if(yearElement){

yearElement.textContent =
new Date().getFullYear();

}
