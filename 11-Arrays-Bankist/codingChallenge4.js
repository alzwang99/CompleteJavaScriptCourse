'use strict'

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
];

const ownersEatTooMuch = [];
const ownersEatTooLittle = [];
const ownersEatOkay = [];

dogs.forEach(dog => {
    dog.recomm = dog.weight ** 0.75 * 28;
    const under = dog.curFood < (dog.recomm * 1.1);
    const over = dog.curFood > (dog.recomm * 1.1);
    const okay = dog.curFood < dog.recomm * 1.1 && dog.curFood > dog.recomm * 0.9
    dog.healthy = over && under;
    if (over) {
        ownersEatTooMuch.push(dog.owners);
    } else if (under) {
        ownersEatTooLittle.push(dog.owners);
    } else if (okay) {
        ownersEatOkay.push(dog);
    }
});

console.log(ownersEatTooLittle.flat(1).join(" and "));
console.log(ownersEatTooMuch.flat(1).join(" and "));

console.log(dogs.some(dog => dog.curFood === dog.recomm));

console.log(dogs.some(dog => dog.curFood < dog.recomm * 1.1 && dog.curFood > dog.recomm * 0.9));

const dogsAscending = dogs.sort((a, b) => a.recomm - b.recomm);

console.log(dogsAscending);