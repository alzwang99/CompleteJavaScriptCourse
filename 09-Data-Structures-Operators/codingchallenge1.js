'use strict'

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'
    ],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33, x: 3.25, team2: 6.5,
    },
};
//1. Utilized Deconstructing arrays
const [players1, players2] = game.players;

//2. utilized rest operator to seperate the players;

[players1["gk"], ...players1["fieldPlayers"]] = players1;
[players2["gk"], ...players2["fieldPlayers"]] = players2;


//3. utilized spread operator to combine the players
const allPlayers = [...players1, ...players2];

//4. I originally wanted to write [players1Final["gk"], ...players1Final["fieldPlayers"]] = [players1["gk"], ...players1["fieldPlayers"], ...substitutePlayers], but it didn't work

//opted to just create a new array, use spread to put everything in players1Final, then use rest to create different
//players within the object
const substitutePlayers = ['Thiago', 'Coutinho', 'Perisic'];

const players1Final = [...players1, ...substitutePlayers];

[players1Final["gk"], ...players1Final["fieldplayers"]] = players1Final;

//5. destructured and made sure to rename the x into draw;

const { team1, x: draw, team2 } = game.odds;

//Another way to destructure the object.
const { odds: { team3, x: nonDraw, team4 } } = game;

console.log(draw);

//6. Created a method that takes in any number of players. Then utilized a for loop with a ternary operator to check if the player is contained in one of the player's team and if so, they scored for that team. This seems inefficient.

const printGoals = function (...players) {
    let team1Goals = 0;
    let team2Goals = 0;
    for (let i = 0; i <= players.length - 1; i++) {
        players1.includes(players[i]) ? (team1Goals++, console.log(`${players[i]} scored. Munich has ${team1Goals} goals!`)) :
            (team2Goals++, console.log(`${players[i]} scored. Dortmund has ${team2Goals} goals!`))
    }
}

//Here is ChatGPT's version;

const printGoalsgpt = function (...players) {
    let team1Goals = 0;
    let team2Goals = 0;

    for (const player of players) {
        const team = players1.includes(player) ? 'Munich' : 'Dortmund';
        const teamGoals = players1.includes(player) ? ++team1Goals : ++team2Goals;

        console.log(`${player} scored. ${team} has ${teamGoals} goals!`);
    }
};


printGoals('Burki', 'Muller', 'Lewandowski', 'Kimmich');

printGoals(...game.scored);

//7. Utilized AND to check if it will return true at all, if not, then the OR will run true.

console.log((team1 < team2 && "Team 1 wins") || "Team 2 wins");
