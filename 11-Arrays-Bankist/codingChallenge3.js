'use strict'

//This is not correct.

const calcAverageHumanAge = (ages = "array") => {
    const filteredAges = ages.map((age) => age <= 2 ? 2 * age : 16 + age * 4);

    return (filteredAges.reduce((acc, cur) => cur >= 18 ? acc + cur : acc, 0) / filteredAges.length);
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));