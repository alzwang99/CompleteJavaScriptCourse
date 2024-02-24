// 'use strict';

// function fruitProcessor(apples, oranges) {
//     const juice = `This juice consists of ${(apples / (apples + oranges)) * 100}% apple and ${(oranges / (apples + oranges)) * 100}% orange.`
//     return juice;
// }

// const fruitJuice = fruitProcessor(3, 4);

// console.log(fruitJuice);

// function describeCountry(country, population, capitalCity) {
//     const result = `${country} has ${population} million people and its capital city is ${capitalCity}.`;
//     return result;
// }

// const usa = describeCountry("U.S", 5, "Washington D.C");

// console.log(usa);

// const cutFruitPieces = (fruit) => fruit * 4;

// const fruitProcessor = (apples, oranges) => {
//     const AP = cutFruitPieces(apples);
//     const OP = cutFruitPieces(oranges);
//     return `This juice consists of ${AP} slices of apple and ${OP} slices of orange.`;
// }

// const fruitJuice = fruitProcessor(4, 4);
// console.log(fruitJuice);

//Object Literal Syntax

// const albert = {
//     firstName: 'Albert',
//     lastName: 'Wang',
//     born: 1999,
//     age: function () {
//         return 2024 - this.born;
//     },
//     getSummary: function () {
//         return `${this.firstName} ${this.lastName} is ${albert.age()} years old and he was born in the ${this.born < 2000 ? '20th' : '21st'} century.`
//     }
// }

// //Let's assume someone wants to find out about me.
// //We can utilize a prompt to request a specific input that should match 
// //with a key to return a value.

// // const test = prompt("This is Albert, what would you like to know about him? Select firstName, lastName, or age.");

// // if (albert[test]) {
// //     console.log(albert[test]);
// // } else {
// //     console.log("Sorry this is not a proper input. Please refresh the page.");
// // }

// console.log(albert.getSummary());


/* Write your code below. Good luck! 🙂 */

// const test = function (fullName, mass, height) {
//     this.fullName = fullName;
//     this.mass = mass;
//     this.height = height;
//     this.calcBMI = () => {
//         this.bmi = mass / (height * height);
//         return this.bmi;
//     }
// }

// const mark = new test("Mark Miller", 78, 1.69);
// const john = new test("John Smith", 92, 1.95);

// mark.calcBMI();
// john.calcBMI();

// if (mark.calcBMI() > john.calcBMI()) {
//     console.log(`${mark['fullName']}'s BMI (${mark.bmi}) is higher than ${john['fullName']}'s ${john.bmi}`)
// } else {
//     console.log(`${john['fullName']}'s BMI (${john.bmi}) is higher than ${mark['fullName']}'s ${mark.bmi}`)
// }

const albert = ['Yo', 'my name', 'is', 'Albert', 'Wang', ['Yuh', 'Yuh', "yuhhhh"]];

for (let i = 0; i <= albert.length - 2; i++) {
    console.log(albert[i])
}

const year = [1999, 2003, 2017, 1967];

const age = [];

for (let i = 0; i <= year.length - 1; i++) {
    age.push(2024 - year[i]);
}

console.log(age[3]);