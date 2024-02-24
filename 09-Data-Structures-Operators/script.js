'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (startIn, mainIn) {
    return [this.starterMenu[startIn], this.mainMenu[mainIn]];
  },
  orderDelivery: function ({ startIn, mainIn, time, address }) {
    console.log(`Order recieved! ${this.starterMenu[startIn]} and ${this.mainMenu[mainIn]} will be 
    delivered to ${address} at ${time}.`);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}!`);
  }
};

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];

// const bigMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// // console.log(bigMenu);

// // const [a, , b, ...others] = [...restaurant.mainMenu, ...restaurant.starterMenu];

// // const { sat, ...weekdays } = restaurant.openingHours;

// // console.log(weekdays);

// // const add = function (...numbers) {
// //   let sum = 0;
// //   for (let i = 0; i <= numbers.length - 1; i++) {
// //     sum += numbers[i];
// //   }
// //   return sum;
// // };

// // console.log(add(1, 2, 3, 4, 5, 6, 7, 8));

// // //Better way to write it.
// // const add1 = function (...numbers) {
// //   return numbers.reduce((sum, currentNumber) => sum + currentNumber, 0);
// // };


// // const person = {
// //   firstName: "Bruh",
// //   lastName: "Moment",
// // };

// // const person1 = {
// //   ...person,
// //   firstName: "Hrub"
// // };


// // const ingredients = [prompt("Let's make pasta! Ing 1?"), prompt("ing2?"), prompt("ing3?")]

// // restaurant.orderPasta(...ingredients);

// // restaurant.orderDelivery({
// //   time: "22:30",
// //   address: "Via del Sole, 21",
// //   mainIn: 2,
// //   startIn: 2,
// // })

// // const {
// //   name: restaurantName,
// //   openingHours: hours,
// //   categories: tags,
// // } = restaurant;

// // const {
// //   menu = [],
// //   starterMenu: starters = []
// // } = restaurant;

// // const {
// //   fri: { open: o, close: c },
// // } = hours;

// // console.log(o, c);

// console.log(...bigMenu.entries());

// for (const [i, item] of bigMenu.entries()) {
//   console.log(`${i + 1}: ${item}`);
// }

// const days = ["mon", "tues", "wed", "thu", "fri", "sat", "sun"];

// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we are open at ${open}`);
// }


// const rest = new Map();

// rest.set('name', "Classico Italiano")
//   .set(1, "Firenze, Italy")
//   .set(2, "Lisbon Portugal")
//   .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
//   .set("open", 11)
//   .set("close", 23)
//   .set(true, "We are open")
//   .set(false, "We are close");

// console.log(rest.get(rest.get("open") < 21 && rest.get("close") > 21));

// const quiz = new Map([
//   ["question", "What Programming Language is the best?"],
//   [1, "C"],
//   [2, "Java"],
//   [3, "JavaScript"],
//   ["answer", 3],
//   [true, "You are correct!"],
//   [false, "Please try again"]
// ]);

// console.log(quiz.get("question"));

// quiz.forEach((value, key) => {
//   if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
// });

// const answer = Number(prompt("Your Answer: "));

// console.log(quiz.get(quiz.get("answer") === answer));
const breakApart = str => str.split(" ").map(word => console.log(word));
const capitalize = str => str.split(' ').map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()).join(" ");

breakApart("albert zi wang");
console.log(capitalize("AlBeRt zI wAnG"));

const maskCreditCard = function (number) {
  const str = String(number);
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
}

console.log(maskCreditCard(345678876554567));