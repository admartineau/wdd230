year = new Date().getFullYear();
document.querySelector("#year").innerHTML = year
document.querySelector("#lastpageupdate").innerHTML= `Last Updated: ${document.lastModified}`;

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById('hamburgerBtn');
x.onclick = toggleMenu;