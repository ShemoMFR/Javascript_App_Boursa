const url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
const loader = document.getElementById("container-loader2");
let symbol = localStorage.getItem("symbol");
let image = document.getElementById('img-company');
let name = document.getElementById('name-company');
let description = document.getElementById('description-company');
let websiteCompany = document.getElementById('website-company');
let stockPrice = document.getElementById('stock-price');
let percentage = document.getElementById('percentage');

function getInfosCompany() {
    fetch(url + symbol) 
    .then(response => response.json())
    .then(data => {

        image.src = data.profile.image;
        name.textContent = data.profile.companyName;
        description.textContent = data.profile.description;
        websiteCompany.href = data.profile.website;
        websiteCompany.textContent = `website link : ${data.profile.companyName}`
        stockPrice.textContent = `Stock Price : $${data.profile.price}`;
        percentage.textContent = data.profile.changesPercentage;

        if (Number(data.profile.changesPercentage.replace("(", "").replace("%", "").replace(")", "")) > 0) {
            percentage.style.color = "rgb(0, 253, 0)";
        }

        else {
            percentage.style.color = "red";
        }

        getHistoryStock();

    })
};

function getHistoryStock() {
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
    const graph = document.getElementById('myChart').getContext("2d");
    let arrayHistoricalPrices = [];
    let arrayDatePrices = [];

    loader.classList.add("loader2");

    fetch(url)
    .then(response => response.json())
    .then(data => {

        for (let i = data.historical.length - 1; i > 0; i--) {
            arrayHistoricalPrices.push(data.historical[i].close);
            arrayDatePrices.push(data.historical[i].date);
        }
        
        let myChart = new Chart(graph, {
            type: 'line',
        data: {
            labels: arrayDatePrices,
            datasets: [{
                label: 'Company historical prices',
                data: arrayHistoricalPrices,
                backgroundColor: ['red'],
                borderColor: ['red'],
                fill: true,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });

    loader.classList.remove("loader2");

    })

};

getInfosCompany();


    


