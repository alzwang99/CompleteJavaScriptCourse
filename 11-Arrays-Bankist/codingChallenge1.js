'use strict'

//Data
const juliaDogs1 = [3, 5, 2, 12, 7];
const kateDogs1 = [4, 1, 15, 8, 3];
const juliaDogs2 = [9, 16, 6, 8, 3];
const kateDogs2 = [10, 5, 6, 1, 4];


//Takes in two arrays, I have set default values just in case.
const checkDogs = (arr1 = [3, 4, 5, 6, 7], arr2 = [1, 6, 7, 2, 5]) => {
    //Concated the adjusted array with the second array
    const combined = arr1.slice(1, arr1.length - 2).concat(arr2);
    //For Each Loop using arrows
    combined.forEach((age, i) => {
        //Simplified the duplicate phrases
        const phrase = `Dog Number ${i + 1} is`;
        const str = age < 3 ? `${phrase} still a puppy.` : `${phrase} an adult, and is ${age} years old.`;
        console.log(str);
    });
};

checkDogs(undefined, kateDogs1);