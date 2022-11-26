// last update in footer
year = new Date().getFullYear();
document.querySelector("#year").innerHTML = year;
document.querySelector("#lastpageupdate").innerHTML= `Last Modified: ${document.lastModified}`;

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

// todays date 

const datefield = document.querySelector(".date");

const todayDate = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
	todayDate
);

datefield.innerHTML = `<em>${fulldate}</em>`;


// meeting banner

let dayWeek = todayDate.getDay();
console.log(dayWeek);

if (dayWeek == 1 | dayWeek ==2) {
    let banner = document.getElementById("banner");
    if (banner != undefined) {
        banner.style.display = "block";
        banner.innerText = "🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.";
    }
}

// weather api

let currentTemp = document.querySelector('#current-temp');
let weatherIcon = document.querySelector('#weather-icon');
let captionDesc = document.querySelector('#description');
let windChill = document.querySelector('#windChill');
let windSpeed = document.querySelector('#windSpeed');

let id = 5429032;
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
let apiKey = '4f6fd97aee4a892adb33594c0527da37';
let units = 'imperial'
//

let apiURL = `${baseURL}id=${id}&units=${units}&appid=${apiKey}`


async function apiFetch() {
    try {
        const response = await fetch(apiURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
            wind(data);
        } else {
            console.log(`Response not OK ${await response.text()}`);
        }
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

apiFetch()

//captialize
function captialize(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

//wind
function wind(data) {
    const tempF = data.main.temp;
    const speed = data.wind.speed;
    return windchill = (35.74 + (0.6215*tempF) - 35.75*(Math.pow(speed, 0.16)) + (0.4275*tempF)*(Math.pow(speed, 0.16))).toFixed(2);
}
// display the results 
function displayResults(data) {
    currentTemp.textContent = data.main.temp;
    windSpeed.textContent = data.wind.speed;
    let desc = captialize(data.weather[0].description)
    captionDesc.textContent = desc;
    windChill.textContent = Math.round(wind(data) * 100) / 100;
    let icon = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.alt = `Littleton, Colorado Weather: ${desc}${icon}`;
}
