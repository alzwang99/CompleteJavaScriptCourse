'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function(data, className = "") {
      const html = `
      <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                  <h3 class="country__name">${data.name} (${data.nativeName})</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} million people</p>
                  <p class="country__row"><span>🗣️</span>${data.languages[0].nativeName}</p>
                  <p class="country__row"><span>💰</span>(${data.currencies[0].symbol}) ${data.currencies[0].name}</p>
            </div>
      </article>
      `;
      console.log(html)
      countriesContainer.insertAdjacentHTML("beforeend", html);
      countriesContainer.style.opacity = 1;
}

const getCountryData = function (country) {

      const request = new XMLHttpRequest();

      request.open("GET", `https://countries-api-836d.onrender.com/countries/name/${country}`);
      request.send();

      request.addEventListener("load", function () {
            const data = JSON.parse(request.responseText)[0];
            
            console.log(data);


            const neighbor = data.borders?.[0];
            const request2 = new XMLHttpRequest();
            request2.open("GET", `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`);
            request2.send();

            request2.addEventListener("load", function() {
                  const data2 = JSON.parse(request2.responseText);
                  console.log(data2);

                  renderCountry(data);
                  renderCountry(data2, "neighbor");
            })


      })
}
getCountryData("USA");
getCountryData("China")