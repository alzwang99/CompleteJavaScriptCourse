'use strict';

// const Person = function(firstName, birthYear) {
//       // Instance properties
//       this.firstName = firstName;
//       this.birthYear = birthYear;
// };

// 1. New (empty object) {} is created
// 2. Function is called, this = {}
// 3. {} linked to prototype
// 4. Function automatically return {}

// const albert = new Person("Albert", 1999);
// console.log(albert.firstName);

// //This is true because albert is an Instance of the Person class
// console.log(albert instanceof Person);


// Prototypes

// Person.prototype.calcAge = function () {
//       console.log(2024 - this.birthYear);
// };

// albert.calcAge();  


//Coding Challenge 1

// Make a constuctor function called Car with make and speed properties.
// const Car = function(make, speed ) {
//       this.make = make;
//       this.speed = speed;
// }

// // Make a function called accelerate that is a function of the Car prototype.
// Car.prototype.accelerate = function() {
//       this.speed += 10;
//       console.log(this.speed);
// }

// // Make a function called brake that is a function of the Car prototype.

// Car.prototype.brake = function() {
//       this.speed -= 5;
//       console.log(this.speed);
// }

// const car1 = new Car("BMW", 120);
// const car2 = new Car("Mercedes", 95);

// car1.accelerate();
// car1.accelerate();


//Classes

// class Person {

//       constructor(fullName, birthYear) {
//             this.fullName = fullName;
//             this.birthYear = birthYear;
//       }

//       calcAge() {
//             console.log(2024 - this.birthYear);
//       }     

//       //This is to ensure there are no conflicts between the instance properties and the prototype properties;
//       set fullName(name) {
//             if(name.includes(" ")) this._fullName = name;
//             else alert(`${name} is not a full name`);
//       }

//       get fullName() {
//             return this._fullName;
//       }
// };

// const albert = new Person("Albert Wang", 1999);

// const account = {
//       owner : "Albert",
//       movements : [20, 100, 400, 500],

//       get latest () {
//             return this.movements[this.movements.length - 1];
//       },

//       set latest (value) {
//             this.movements.push(value);
//       },

//       // static hey () {
//       //       console.log("Hey there");
//       // }
// };

// account.latest = 50;

// console.log(account.latest);

// const PersonProto = {

// };

// class CarClass {
//       constructor(make, speed) {
//             this.make = make;
//             this.speed = speed;
//       }

//       accelerate() {
//             this.speed += 10;
//             console.log(this.speed);
//       }

//       brake() {
//             this.speed -= 5;
//             console.log(this.speed);
//       }

//       get speedUS() {
//             return this.speed / 1.6;
//       }
//       set speedUS(speed) {
//             this.speed = speed * 1.6;
//       };
// }

// const Ford = new CarClass("Ford", 120);

// Ford.accelerate();
// Ford.brake();

// console.log(Ford.speedUS);

// Ford.speedUS = 100;
// console.log(Ford.speed);
// console.log(Ford.speedUS);

// //Coding Challenge 3

// // Make a constuctor function called Car with make and speed properties.
// const Car = function(make, speed ) {
//       this.make = make;
//       this.speed = speed;
// }


// const EV = function(make, speed, chg ) {
//       Car.call(this, make, speed);
//       this.chg = chg;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.accelerate = function() {
//       this.speed += 20;
//       this.chg -= 1;
//       console.log(`${this.make} is going at ${this.speed} with a charge of ${this.chg}%.`);
// }

// EV.prototype.chargeBattery = function(chg){
//       this.chg = chg;
// }


// const tesla = new EV("Tesla", 120, 23);

// tesla.accelerate();
class Person {

      constructor(fullName, birthYear){
            this.fullName = fullName;
            this.birthYear = birthYear;
      }
}


class Student extends Person {
      //Public Field
      university = "Auburn University";

      //Private Field
      #studyHours = 0;
      #course;

      //Static Field
      static numSubjects = 10;


      //Constructor 
      constructor(fullName, birthYear, startYear, course){
            super(fullName, birthYear);

            //Instance Properties
            this.startYear = startYear;
            this.#course = course;
      }
      
      //Public Method
      introduce() {
            console.log(`Yo my name is ${this.fullName}, I study ${this.#course} at ${this.university}`);
      }

      study(h) {
            this.#makeCoffee();
            this.#studyHours += h;
      }

      // Private Method

      #makeCoffee() {
            return "I drank coffee to increase my study hours."
      }

      get testScore() {
            return this._testscore;
      }
      
      //Public method with a protected variable
      set testScore(score) {
            this._testscore = score < 20 ? score : 0
      }

      //Static Method
      static printCurriculum() {
            console.log(`There are ${this.numSubjects} subjects`)
      }
};

class Account {
      //Private fields. Prevents from being accessed outside of the enclosing class.
      #movements = [];
      #pin;
      

      constructor(owner, currency, pin) {
            this.owner = owner;
            this.currency = currency;
            this.#pin = pin;
            this.locale = navigator.language; 
      }

      getMovements() {
            return this.#movements;
      }

      deposit(val) {
            this.#movements.push(val);
            return this;
      }

      wihdraw(val) {
            this.deposit(-val);
            return this;
      };

      //Private Methods

}

const acc1 = new Account("Albert", "USD", 1111);