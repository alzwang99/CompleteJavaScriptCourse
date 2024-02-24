'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderError = function (msg) {
      countriesContainer.insertAdjacentText("beforeend", msg);
};

const getJSON = function (url, errorMsg = "Something went wrong") {
      return fetch(url).then(response => {
            if (!response.ok)
                  throw new Error(`${errorMsg} ${response.status}`);

            return response.json()
      })
}

const renderCountry = function (data, className = "") {
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
      countriesContainer.insertAdjacentHTML("beforeend", html);
      countriesContainer.style.opacity = 1;
}


const getCountryData = function (country) {
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`, "Country Not Found")
            .then(data => {
                  const country = data[0]
                  renderCountry(country);
                  const neighbor = country.borders?.[0];
                  return getJSON(`https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`, "Neighbor Not Found")
                        .then(data => renderCountry(data, "neighbor"))
                        .catch(err => {
                              console.log("error");
                              renderError(`Cannot Load Page ${err}`)
                        });
            })
            .catch(err => {
                  console.log("error");
                  renderError(`Cannot Load Page ${err}`)
            })
            .finally(() => countriesContainer.style.opacity = 1)
}


// const lotteryPromise = new Promise((resolve, reject) => {
//       if (Math.random() >= 0.5) {
//             resolve("You Win")
//       } else {
//             reject(new Error("You lost your money"))
//       }
// });



// const wait = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

// wait(3).then(() => lotteryPromise)
//       .then(res => console.log(res))
//       .catch(err => console.log(err))
//       .finally(() => console.log("Result is above."));


const getPosition = () => {
      return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
      })
}


const whereAmI = async () => {
      try {
            const pos = await getPosition();
            const { latitude: lat, longitude: lng } = pos.coords;

            const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

            if (!resGeo.ok) throw new Error("Problem getting location data");

            const dataGeo = await resGeo.json();
            const country = dataGeo.country

            const res = await fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`);

            if (!res.ok) throw new Error("Problem getting country");

            const data = await res.json();
            renderCountry(data[0]);

            return `You are in ${dataGeo.city}. ${dataGeo.country}`;
      } catch (err) {
            renderError(`\nPay to Win prevails... ${err.message}`);
            countriesContainer.style.opacity = 1;

            throw err;
      }
}

btn.addEventListener("click", () => whereAmI()
      .then(res => console.log(res))
      .catch(err => console.log(err.message)));

const get3Countries = async (c1, c2, c3) => {
      try {

      }
      catch (err) {
            console.error(err);
      }
}