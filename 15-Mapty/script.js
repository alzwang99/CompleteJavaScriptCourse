'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


//HTML DOM
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//Global Variable

//Classes

class Workout {
      date = new Date();
      //This ID is generated from the last 10 digits of the Date. Could have used a library to gen a unique ID as well.
      id = (Date.now() + "").slice(-10);

      constructor(coords, distance, duration) {
            this.coords = coords;  //[lat, lng]
            this.distance = distance; // in miles
            this.duration = duration; // in mins
      }

      _setDescription() {

            const months = [ "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];
            this.description = `${this.name} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
      }
}

class Running extends Workout {

      name = "Running";
      constructor(coords, distance, duration, cadence) {
            super(coords, distance, duration);
            this.cadence = cadence;
            this.calcPace();
            this._setDescription();
      }

      calcPace() {
            this.pace = this.duration / this.distance;
            return this.pace
      }
}

class Cycling extends Workout {

      name = "Cycling";
      constructor(coords, distance, duration, elevationGain) {
            super(coords, distance, duration);
            this.elevationGain = elevationGain;
            this.calcSpeed();
            this._setDescription();
      }
      //Calculate speed in by hours
      calcSpeed() {
            this.speed = this.distance / (this.duration / 60);
            return this.speed;
      }
} 

class App {
      //Private fields
      #map;
      #mapEvent;
      #workouts = [];
      #zoomLevel = 13;

      //Initilizes getPosition, created a form, and performs inputType toggle functions.
      constructor() {
            this._getPosition();

            this._getLocalStorage();

            form.addEventListener("submit", (e) => {
                  e.preventDefault();
                  this._newWorkOut();
            });
            inputType.addEventListener("change", () => this._toggleElevationField());
            containerWorkouts.addEventListener("click", (e) => {
                  const workoutEl = e.target.closest(".workout");
                  this._moveToPopup(workoutEl)});
      }

      //Essentially asks the user if they would share their location. Runs loadMap if successful
      _getPosition() {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
                  () => alert("Could not get your position"));

      }

      //Loads map using Leaflet library and utilizes latitude and longitude to pinpoint a location.
      //When the map is clicked on, it runs showForm
      _loadMap(position) {
            const { latitude, longitude } = position.coords
            const coords = [latitude, longitude];
            this.#map = L.map('map').setView(coords, this.#zoomLevel);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);

            this.#map.on("click", (e) => {
                  this._showForm(e);
            })

            this.#workouts.forEach(work => {
                  this._renderWorkOutMarkers(work);
            })
      }
      
      //Utilizes the latitude and longitude values from loadMap to register a new field for entry.
      _showForm(mapE) {
            this.#mapEvent = mapE;
            form.classList.remove("hidden");
            inputDistance.focus();
      }

      //This allows the input to toggle between Walking vs Cycling
      _toggleElevationField() {
            inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
            inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
      }

      //This will show a popup after we submit a new workout from the constructor.
      _newWorkOut() {

            const numCheck = (...val) => {
                  if(!val.every(inp => Number.isFinite(inp))) {
                        console.log(val);
                        alert("One of these inputs do not have a valid value.");
                        return false;
                  }
                  return true;
            };

            const allPositive = (...val) => {
                  if(!val.every(inp => inp > 0)) { 
                        alert("One of these inputs contains an invalid negative value");
                        return false;
                  }
                  return true;
            }
            
            //Get data from form
            const type = inputType.value;
            const distance = +inputDistance.value;
            const duration = +inputDuration.value;
            //Coordinates
            const { lat, lng } = this.#mapEvent.latlng
            //The workout could be a Running or Cycling Object. Else it is blank.
            let workout;
            //Check if data is valid
            
            //  If workout = running, create running objects // else is cycling
            if(type === "running") {
                  const cadence = +inputCadence.value;
                  const input = [distance, duration, cadence];
                  //Checks if any inputs are nonNumbers or negative
                  if (!numCheck(...input) || !allPositive(...input)) return;
                  
                  //Creates new workout which will be used for the html portion
                  workout = new Running([lat, lng], distance, duration, cadence);
            };
            if(type === "cycling") {
                  const elevation = +inputElevation.value;
                  const input = [distance, duration, elevation];

                  //Checks if any inputs are nonNumbers or negative
                  //Elevation can be negative
                  if(!numCheck(...input) || !allPositive(...input.slice(0, 2))) return;

                  //Creates new workout which will be used for the html portion
                  workout = new Cycling([lat, lng], distance, duration, elevation);
            };
            //Add new object to workout array
            this.#workouts.push(workout);

            this._renderWorkOut(workout);
            //Render workout on map as marker
            this._renderWorkOutMarkers(workout);
      }

      _renderWorkOutMarkers(workout){
            L.marker(workout.coords)
                  .addTo(this.#map)
                  .bindPopup(L.popup({
                        maxWidth: 250,
                        minWidth: 100,
                        autoClose: false,
                        closeOnClick: false,
                        className: `${workout.name.toLowerCase()}-popup`
                  }))
                  .setPopupContent(`${workout.name === "Running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`)
                  .openPopup();

            //Render workout on list. This grabs the components of the workout object we just created

            // Clear input fields
            inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";

            //Hide form. It is redundant, however, it serves as a way for the form disappearing without the 
            //new data perform an awkward transition. 
            form.style.display = "none";
            form.classList.add("hidden");
            setTimeout(() => (form.style.display = "grid"), 1000);

            //Stores into local storage
            localStorage.setItem("workouts", JSON.stringify(this.#workouts))
      }

      _renderWorkOut(workout) {
            if (!workout) return;
            let html = `
            <li class="workout workout--${workout.name.toLowerCase()}" data-id="${workout.id}">
                  <h2 class="workout__title">${workout.description}</h2>
                  <div class="workout__details">
                        <span class="workout__icon">${
                              workout.name === "Running" ? "🏃‍♂️" : "🚴‍♀️"
                        }</span>
                        <span class="workout__value">${workout.distance}</span>
                        <span class="workout__unit">km</span>
                  </div>
                  <div class="workout__details">
                        <span class="workout__icon">⏱</span>
                        <span class="workout__value">${workout.duration}</span>
                        <span class="workout__unit">min</span>
                  </div>
            `;

            if(workout.name === "Running") {
                  html += `          
                        <div class="workout__details">
                              <span class="workout__icon">⚡️</span>
                              <span class="workout__value">${workout.pace.toFixed(1)}</span>
                              <span class="workout__unit">min/km</span>
                        </div>
                        <div class="workout__details">
                              <span class="workout__icon">🦶🏼</span>
                              <span class="workout__value">${workout.cadence}</span>
                              <span class="workout__unit">spm</span>
                        </div>
                  </li>`
            }
            if(workout.name === "Cycling") {
                  html += `
                        <div class="workout__details">
                              <span class="workout__icon">⚡️</span>
                              <span class="workout__value">${workout.speed.toFixed(1)}</span>
                              <span class="workout__unit">km/h</span>
                        </div>
                        <div class="workout__details">
                              <span class="workout__icon">⛰</span>
                              <span class="workout__value">${workout.elevationGain}</span>
                              <span class="workout__unit">m</span>
                        </div>
                  </li>
                  `
            };
            //Inserts html into the form after it is generated.
            form.insertAdjacentHTML("afterend", html);
      };

      //Centers the map to selected workout.
      _moveToPopup(e) {
            if(!e) return;
            const wrkout = this.#workouts.find(work => work.id === e.dataset.id);

            this.#map.setView(wrkout.coords, this.#zoomLevel, {
                  animate: true,
                  pan: {
                        duration: 1
                  }
            })
      }

      //Grabs Local Storage data from _NewWorkout Method

      _getLocalStorage() {
            const objectData = JSON.parse(localStorage.getItem("workouts"));

            if (!objectData) return;

            this.#workouts = objectData;

            this.#workouts.forEach(work => {
                  this._renderWorkOut(work);
            })
      }

      reset() {
            localStorage.removeItem("workouts");
            location.reload();
      }
};

const app = new App;