class CarCl {
      constructor(make, speed){
            this.make = make;
            this.speed = speed;
      }

      accelerate(spd) {
            this.speed += spd;
            console.log(`Your ${this.make} increased the speed by ${spd} and is driving at ${this.speed} mph`);
            return this;
      }

      brake(spd) {
            this.speed -= spd;
            console.log(`Your ${this.make} decreased the speed by ${spd} and is driving at ${this.speed} mph`);
            return this;
      }
}

class EVCl extends CarCl {
      #charge;
      constructor(make, speed, charge) {
            super(make, speed);
            this.#charge = charge;
      }

      chargeBattery(bat) {
            this.#charge += bat;
            console.log(`Your car charged by ${bat}% and now has ${this.#charge}%.`)
            return this;
      }

      accelerate() {
            super.accelerate(20);
            this.#charge--;
            console.log(`Your ${this.make} lost 1% of power and now has ${this.#charge}`);
            return this;
      }
}

const rivian = new EVCl("Rivian", 120, 23);

rivian.accelerate().brake(10).accelerate().brake(20).chargeBattery(50);