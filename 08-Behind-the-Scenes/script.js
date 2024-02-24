'use strict';

// const calcAge = function (birthYear) {
//     const age = 2037 - birthYear;
//     console.log(firstName);
//     return age;
// }

// const firstName = "Jonas";

// calcAge(1999);

// const test = {
//     firstName: "Bruh",
//     lastName: "Moment",
//     greet: function () {
//         console.log(`My first name is ${this.firstName}`);
//         const ending = () => console.log(`And my last name is ${this.lastName}`);
//         ending();
//     }
// }

// test.greet();

const me = {
    name: "Bruh",
    lastName: "Moment"
};

const you = Object.assign({}, me);

you.name = "Moment";

console.log(`${you.name} ${me.name}`);