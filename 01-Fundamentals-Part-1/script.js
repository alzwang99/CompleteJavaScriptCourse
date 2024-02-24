// let js = "amazing";
// if (js === "amazing") alert("JavaScript is amazing");

// let country = "United States";
// let population = 50;
// let isIsland = false;
// let language;

// console.log(typeof language);




// const firstName = "Albert";
// const job = "jobless person";
// const birthYear = 1999;
// const currentYear = 2024;

// const albert = `I'm ${firstName}, a ${(currentYear - birthYear)} year old ${job}!`;

// console.log(albert);


// const age = 18;

// if (age >= 21) {
//     console.log("I can drink all night.")
// } else {
//     console.log(`I have ${21 - age} years left until I can drink rip.`)
// };

// const birthYear = 19;

// const century = Math.ceil((birthYear / 100));

// console.log(century);



// const a = '200';
// const b = '19';
// const c = '18';

// console.log(a * b - c);


const day = 'MoNDaY';
switch (day.toLocaleLowerCase()) {
    case 'monday':
        console.log("Today is Monday");
        break;
    case 'tuesday':
        console.log("Today is Tuesday");
        break;
    case 'wednesday':
    case 'thursday':
    case 'friday':
    case 'saturday':
    case 'sunday':
        console.log("I'm too lazy to write the rest");
        break;
    default:
        console.log("MISINPUT!");
}

const work = day.toLocaleLowerCase() === 'monday' ? "It's work day..." : "Idk I am too lazy";

console.log(work);