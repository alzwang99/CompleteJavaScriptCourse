// Remember, we're gonna use strict mode in all scripts now!
'use strict';

console.log("Hello World");

const forecast1 = [17, 21, 23];

const forecast2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
    for (let i = 0; i <= arr.length - 1; i++) {
        console.log(`It will be ${arr[i]} degrees C in ${i + 1} days.`)
    }
}

printForecast(forecast1);