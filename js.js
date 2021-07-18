const submit = document.getElementById('submit');
const input = document.getElementById('input');
const allResults = document.getElementById('result-list');
const loader = document.getElementById("container-loader");

submit.addEventListener('click', displayCompanies);

function displayCompanies() {
    const urlCompanies = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ`;
    const urlSymbol = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
    loader.classList.add("loader");

    fetch(urlCompanies)
    .then((response) => response.json())
    .then((data) => {

        data.forEach((item) => {

            fetch(urlSymbol + item.symbol)
            .then(response => response.json())
            .then(data => {   

                let container = document.createElement('div');
                container.className = "result";

                let logo = document.createElement('img');
                logo.className = "logo";
                logo.src = data.profile.image;

                let div = document.createElement('div');
                div.textContent = item.name + ' ' + '(' + item.symbol + ')';

                let results = document.querySelectorAll('.result');

                div.addEventListener('click', () => {
                    localStorage.setItem("symbol", item.symbol)
                    window.open("company.html");
                    window.location.reload();
                });

                let perc = document.createElement('span');
                perc.textContent = data.profile.changesPercentage; 

                if (Number(data.profile.changesPercentage.replace("(", "").replace("%", "").replace(")", "")) > 0) {
                    perc.style.color = "rgb(0, 253, 0)";
                }
        
                else {
                    perc.style.color = "red";
                }
                   
                if (results.length == 11) {
                    container.innerHTML = "";
                }
                else {
                    container.append(logo, div, perc);
                    allResults.appendChild(container);
                } 

                loader.classList.remove("loader");      

            });  
             
        })    

    });      
}