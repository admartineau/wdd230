   // Brother Blazzard directory page grid/list

   const gridbutton = document.querySelector("#dGrid");
   const listbutton = document.querySelector("#dList");
   const directoryDisplay = document.querySelector("article");
   
   
   gridbutton.addEventListener("click", () => {
       // example using arrow function
       directoryDisplay.classList.add("grid");
       directoryDisplay.classList.remove("list");
   });
   
   listbutton.addEventListener("click", showList);
   
   function showList() {
       directoryDisplay.classList.add("list");
       directoryDisplay.classList.remove("grid");
   }

    const requestPath = 'content/data.json';
    const directoryCards = document.querySelector('.dCards');

    fetch(requestPath)
    .then(function (response) {
        return response.json();
    })

    .then(function (jsonObject) {
        console.table(jsonObject);  // temporary checking for valid response and data parsing
        const companies = jsonObject['companies'];
        companies.forEach(displaycompanies);

    });

    function displaycompanies(company) {
        // Create elements to add to the document
        let card = document.createElement('section');
        let coNamePara = document.createElement('p');
        let logoForDirectory = document.createElement('img');
        let addressPara = document.createElement('p');
        let phonePara = document.createElement('p');
        let coWebsiteLink = document.createElement('a');
        let membershipPara = document.createElement('p');
    
        // Change the textContent property of the coNamePara element to contain the company's full name
        // coNamePara.textContent = company.name + ' ' + company.lastname;
        coNamePara.textContent = company.name;
        coNamePara.classList.add('member-name-p');

        logoForDirectory.setAttribute('src', company.logo);
        logoForDirectory.setAttribute('alt', `${company.name} company logo.`);
        logoForDirectory.setAttribute('loading', 'lazy'); 

        addressPara.textContent = company.address;
        phonePara.textContent = company.phonenumber;

        
        coWebsiteLink.textContent = company.weburl;
        coWebsiteLink.setAttribute('href', company.websurl);
        
        membershipPara.textContent = `Membership: ${company.memberlevel}`;
        membershipPara.classList.add('member-level-p');
    
        // Add/append the section(card) with the coNamePara element
        card.appendChild(logoForDirectory);
        card.appendChild(coNamePara);
        card.appendChild(addressPara);
        card.appendChild(phonePara);
        card.appendChild(membershipPara);
        card.appendChild(coWebsiteLink);
    
        // Add/append the existing HTML div with the directoryCards class with the section(card)
    document.querySelector('article.dCards').appendChild(card);
    };