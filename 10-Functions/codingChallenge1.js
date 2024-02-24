'use strict'

const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        const answer = Number(prompt(`${this.question}\n${this.options.join("\n")}\n(Write option number)`));
        (this.answers[answer] === 0 || this.answers[answer]) ? this.answers[answer]++ : console.log("This answer does not exist.");
        console.log(...this.answers);
        this.displayResults();
        this.displayResults("string");
    },
    displayResults(type = "array") {
        typeof type === "array" ? console.log(this.answers) : console.log(`Poll results are ${this.answers.join(', ')}`);
    }
}

const pollButton = document.querySelector(".poll");

pollButton.addEventListener("click", poll.registerNewAnswer.bind(poll));

