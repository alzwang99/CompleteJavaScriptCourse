'use strict'

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


const renderCountry = function (data) {
    const html = `
    <article class="country">
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
    countriesContainer.insertAdjacentHTML("beforeend", html);
}

const whereAmI = (lat, lng) => {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(res => !res.ok ? alert("This is not Valid") : res.json())
        .then(data => {
            console.log(data);
            console.log(`You are in ${data.city}, ${data.country}`)
            return fetch(`https://countries-api-836d.onrender.com/countries/name/${data.country}`)
                .then(res => !res.ok ? alert("This is not Valid") : res.json())
                .then(data => renderCountry(data[0]))
        })
        .catch(err => console.log(err))
        .finally(() => countriesContainer.style.opacity = 1)
}

whereAmI(52.508, 13.381);