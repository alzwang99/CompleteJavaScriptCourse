'use strict'

//Creates a simple textarea and button

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));


//You insert the test data into the textarea to camelCase the input as well as adding a checkmark for each input.
const button = document.querySelector("button");
let counter = 0;
button.addEventListener("click", function () {
    const text = document.querySelector("textarea").value;
    const block = text.split(`\n`).map(function (text) {
        counter++;
        let [first, second] = text.split("_");
        second = second.charAt(0).toUpperCase() + second.slice(1);
        let final = first.concat(second).trim();
        console.log((final).padEnd(20, " ") + "✅".repeat(counter));
    });
    return block;
});

/*
This is the test data

underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure
*/

/*
This is the expected output

underscoreCase      ✅
firstName           ✅✅
SomeVariable        ✅✅✅
calculateAGE        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅
*/
