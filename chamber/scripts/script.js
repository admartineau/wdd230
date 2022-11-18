// last update in footer
year = new Date().getFullYear();
document.querySelector("#year").innerHTML = year;
document.querySelector("#lastpageupdate").innerHTML= `Last Updated: ${document.lastModified}`;

// hamburger navigation toggle button
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}
const x = document.getElementById('hamburgerBtn');
x.onclick = toggleMenu;

//

// progressive image load
//select all images wih data-src
const imagesToLoad = document.querySelectorAll("img[data-src]");

//parameter for Intersectional for when to start loading
const imgOptions = {
    rootMargin:  '0px 0px 50px 0px',
    threshold: 1 //.5
};

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
            image.removeAttribute('data-src');
    };
};

if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, imgObserver) => {
        items.forEach(item => {
                if (item.isIntersecting) {
                    loadImages(item.target);
                    imgObserver.unobserve(item.target);
                }
        });
    }, imgOptions);


imagesToLoad.forEach(img => {
    imgObserver.observe(img);
});
} else {// just load All images if not supported
    imagesToLoad.forEach(img => {
        loadImages(img);
    });
}

// set date on join page
if (URL == "join.html") {
    document.getElementById("application_date").value = date.getTime();
}

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}
