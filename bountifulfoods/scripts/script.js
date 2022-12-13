// Navigation bar - Brother Blazzard

// Store the selected elements that we are going to use. 
const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('.menu');

// Add a simple arrow function that listens for the <li> hamburger button click event.
// When clicked, the <ul class="navigation">'s class list toggle'
hambutton.addEventListener('click', () => {mainnav.classList.toggle('responsive')}, false);


// last update in footer
year = new Date().getFullYear();
document.querySelector("#year").innerHTML = year;
document.querySelector("#lastpageupdate").innerHTML= `Last Modified: ${document.lastModified}`;