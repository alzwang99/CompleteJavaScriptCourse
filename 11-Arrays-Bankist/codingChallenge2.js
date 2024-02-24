'use strict'

const calcAverageHumanAge = (ages = "array") => {
    const human = ages.map((age) => age <= 2 ? 2 * age : 16 + age * 4)
        .filter((age) => age >= 18)
        .reduce((acc, cur) => acc + cur);
    return human;
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));