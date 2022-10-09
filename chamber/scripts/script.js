function toggleMenu() {
    document.getElementById("primarynav").classList.toggle("open");
    document.getElementById("hambutton").classList.toggle("open");
}

const x = document.getElementById('hambutton');
x.onclick = toggleMenu;

year = new Date().getFullYear();
document.querySelector("#year").innerHTML = year
document.querySelector("#lastpageupdate").innerHTML= `Last Updated: ${document.lastModified}`;