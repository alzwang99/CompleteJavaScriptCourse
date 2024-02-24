const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
]);

//1. You can basically rest the map values, but be sure to call the actual function
console.log(gameEvents.values);
console.log(new Set(gameEvents.values()));

const events = [...new Set(gameEvents.values())];

console.log(events);

//2. Just delete the map event
gameEvents.delete(64);


//3. Print this simple statement
console.log("An event happened, on average, every 9 minutes")

//4. 

gameEvents.forEach((event, time) => {
    time < 46 ? console.log(`[First Half] ${time}: ${event}`) : console.log(`[Second Half] ${time}: ${event}`);
})

