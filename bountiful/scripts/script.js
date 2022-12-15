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

let id = 5334223;
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
    weatherIcon.alt = `Carlsbad, CA Weather: ${desc}${icon}`;
}

/* fruit */
const select = document.querySelector("#select");
const addBtn = document.querySelector(".addBtn");
const orderBtn = document.querySelector(".orderBtn");
const order1 = document.querySelector("#order1");
const order2 = document.querySelector("#order2");
const order3 = document.querySelector("#order3");
const selectedFruits = document.querySelector(".fruitsSelected");
const totCarbs = document.querySelector(".totCarbs");
const totProteins = document.querySelector(".totProteins");
const totFats = document.querySelector(".totFats");
const totSugar = document.querySelector(".totSugar");
const totCal = document.querySelector(".totCal");
const orderTitle = document.querySelector(".orderTitle");
const orderDiv = document.querySelector(".orderDiv");
const date_Time = document.querySelector(".date");
const firstname = document.querySelector(".firstname");
const firName = document.querySelector(".firName");
const email = document.querySelector(".email");
const mail = document.querySelector(".mail");
const phone = document.querySelector(".phone");
const ph = document.querySelector(".ph");
const fruitsSelected = document.querySelector(".fruitsSelected");
const textArea = document.querySelector("#textArea");
const special = document.querySelector(".special");

const url = "https://brotherblazzard.github.io/canvas-content/fruit.json"

async function apiFetch() {
  try {
    const response = await fetch(url);
  if (response.ok) {
    const fruitList = await response.json();
    // console.log(fruitList);
    fruitList.forEach(displayOrder);
    fruitList.forEach(orderList);
  } else {
      throw Error(await response.text());
    }
  } catch(error) {
    console.log(error.message);
  }
}

function displayOrder(list) {
  let options = document.createElement("option");
  let name = `${list.name}`;

  options.innerHTML = name;
  options.setAttribute("value", name);
  select.appendChild(options);
}

addBtn.addEventListener('click', () => {
  if (order1.value == '') {
    order1.value = select.value;
  } else if (order2.value == '') {
    order2.value = select.value;
  } else if ( order3.value == '') {
    order3.value = select.value;
  }
})

let carb1 = 0.0;
let pro1 = 0.0;
let fat1 = 0.0;
let cal1 = 0.0;
let sugar1 = 0.0;
let carb2 = 0.0;
let pro2 = 0.0;
let fat2 = 0.0;
let cal2 = 0.0;
let sugar2 = 0.0;
let carb3 = 0.0;
let pro3 = 0.0;
let fat3 = 0.0;
let cal3 = 0.0;
let sugar3 = 0.0;

let numOrders = Number(window.localStorage.getItem("numOrders"));
let orderz = document.querySelector(".order");
orderz.innerHTML = numOrders;

function orderList(items) {
  orderBtn.addEventListener('click', () => {
    if (order1.value == items.name) {
      carb1 = `${parseFloat(items.nutritions.carbohydrates)}`;
      pro1 = `${parseFloat(items.nutritions.protein)}`;
      fat1 = `${parseFloat(items.nutritions.fat)}`;
      cal1 = `${parseFloat(items.nutritions.calories)}`;
      sugar1 = `${parseFloat(items.nutritions.sugar)}`;
    } else if (order2.value == items.name) {
      carb2 = `${parseFloat(items.nutritions.carbohydrates)}`;
      pro2 = `${parseFloat(items.nutritions.protein)}`;
      fat2 = `${parseFloat(items.nutritions.fat)}`;
      cal2 = `${parseFloat(items.nutritions.calories)}`;
      sugar2 = `${parseFloat(items.nutritions.sugar)}`;
    } else if (order3.value == items.name) {
      carb3 = `${parseFloat(items.nutritions.carbohydrates)}`;
      pro3 = `${parseFloat(items.nutritions.protein)}`;
      fat3 = `${parseFloat(items.nutritions.fat)}`;
      cal3 = `${parseFloat(items.nutritions.calories)}`;
      sugar3 = `${parseFloat(items.nutritions.sugar)}`;
    }

    let today = new Date();
    let date = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();
    let time = today.getHours() + ":" + (today.getMinutes() <= 10 ? "0" : "") + today.getMinutes();
    let ampm = today.getHours() >= 12 ? 'PM' : 'AM';
    let dateTime = date+' '+time+' '+ampm;

    date_Time.innerHTML = dateTime;
    firstname.innerHTML =  firName.value;
    mail.innerHTML =  email.value;
    ph.innerHTML =  phone.value;
    fruitsSelected.innerHTML =  `Fruits Ordered: ${order1.value},  ${order2.value},  ${order3.value}`;
    special.innerHTML = `Special Instructions: "${textArea.value}"`;
    orderTitle.innerHTML = `Your Order has been processed!`
    totCarbs.innerHTML = `Total Carbohydrates: ${+carb1 + +carb2 + +carb3}g`;
    totProteins.innerHTML = `Total Proteins: ${+pro1 + +pro2 + +pro3}g`;
    totFats.innerHTML = `Total Fat: ${+fat1 + +fat2 + +fat3}g`;
    totSugar.innerHTML = `Total Sugar: ${+sugar1 + +sugar2 + +sugar3}g`;
    totCal.innerHTML = `Total Calories: ${+cal1 + +cal2 + +cal3} calories`;
    
    let visits = Number(window.localStorage.getItem("numOrders"));
    let order = document.querySelector(".order");

  })
}

orderBtn.addEventListener('click', () => {

  if (numOrders == 0) {
    numOrders = numOrders + 1;
    localStorage.setItem("numOrders", numOrders)
    orderz.innerHTML = numOrders;
  } else if (numOrders > 0) {
    numOrders = numOrders + 1;
    localStorage.setItem("numOrders", numOrders)
    orderz.innerHTML = numOrders;
  };
});

apiFetch();

