'use strict';

// const bookingList = [];

// const createBooking = function (flightNum, numPassenger = 1, price = 199 * numPassenger) {


//     const booking = {
//         flightNum,
//         numPassenger,
//         price,
//     }
//     console.log(booking);
//     bookingList.push(booking);
// }

// createBooking("BO737", 2);

// createBooking("LH123", undefined, 1000);

// const flight = "LH123";

// const passenger = {
//     name: "John Doe",
//     passport: 12654321,
// }

// const checkIn = function (flightNum, passenger) {
//     passenger.name = "Mr. " + passenger.name;
//     console.log(passenger.passport);
//     passenger.passport === 12654321 ? alert("Bruh") : alert("Moment");
// };

// checkIn(flight, passenger);

// const oneWord = function (str) {
//     return str.replace(/ /g, '').toLowerCase();
// }

// const upperFirstWord = function (str) {
//     const [first, ...others] = str.split(" ");
//     return [first.toUpperCase(), ...others].join(" ");
// };

// const transformer = function (str, fn) {
//     console.log(`Transformed String: ${fn(str)}`);
//     console.log(`Original is ${str}`);
//     console.log(`Transformed with ${fn.name} function.`);
// }

// transformer("bruh moment is cool yuh", upperFirstWord);

// transformer("Yo this is so lit omg", oneWord);

// const greet = (greeting, name) => console.log(`${greeting} ${name}!`);

// const greeter = greet("Fuck off")("Daniel");

// const frontier = {
//     airline: "Frontier",
//     iataCode: "FT",
//     bookings: [],
//     book(flightNum, name) {
//         console.log(`${name} booked a seat on ${this.airline} 
//         flight ${this.iataCode}${flightNum}`);
//         this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//     },
// };

// const eurowings = {
//     airline: "Eurowings",
//     iataCode: "EW",
//     bookings: [],
// }

// const book = frontier.book;

// book.call(eurowings, 23, "Sarah Williams");
// console.log(eurowings);

// const flightData = [583, "Joe Dohn"];

// book.apply(frontier, flightData);

// const bookFT = book.bind(frontier);

// bookFT(123, "John Doe");

// //It is possible to also have params binded as well

// const bookFT123 = book.bind(frontier, 123);
// bookFT123("Doe Johnny");

// frontier.planes = 300;
// frontier.buyPlane = function () {
//     this.planes++;
//     console.log(this.planes);
// }

// document.querySelector(".buy").addEventListener("click", frontier.buyPlane.bind(frontier));

// const addTax = (rate, value) => console.log(`${value + value * rate}`);

// const addVAT = addTax.bind(null, .13);

// addVAT(200);

// const addVatT = (value, fn) => fn.bind(null, 0.13, value);

// addVatT(200, addTax);

// (function () {
//     console.log(`This will not run again.`)
// })();

// const secureBooking = function () {
//     let passengerCount = 0;

//     return function () {
//         passengerCount++;
//         console.log(`${passengerCount} passengers`);
//     }
// }

// const booker = secureBooking();

// let f;

// const g = function () {
//     let a = 23;
//     f = function () {
//         a *= 2;
//         console.log(a);
//     };
// };

// g();
// f();
// f();
// f();
// f();
// f();


(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector("body").addEventListener("click", () => header.style.color = "blue");
})();
