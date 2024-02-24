'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Albert Wang',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//IIFE 
const displayMovements = (() => {

  //Initializes the counter only once due to IIFE
  let sortCounter = 0;

  //Actual function
  return (movs) => {
    containerMovements.innerHTML = "";

    //Sort Ascending
    if (sortCounter === 1) {
      movs = movements.slice().sort((a, b) => a - b)
    }

    //Sort Descending. This resets the counter to -1
    else if (sortCounter === 2) {
      sortCounter = -1;
      movs = movements.slice().sort((a, b) => b - a);
    }

    movs.forEach((mov, i) => {
      const type = mov > 0 ? "deposit" : "withdrawal";
      const htmlTemp = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
      `;
      containerMovements.insertAdjacentHTML("afterbegin", htmlTemp);
    });
    //Increases counter after updating the movements display
    sortCounter++;
  }
})();

const calcDisplaySummary = (acct) => {
  const movements = acct.movements;
  const interest = acct.interestRate / 100;
  //Adds the movements into a balance.
  acct.balance = movements.reduce((acc, cur) => acc + cur, 0);
  //Checks which movements are positive then add them together
  const incomes = movements.reduce((acc, cur) => cur > 0 ? acc + cur : acc, 0);
  //Checks which movements are negative then add them together
  const outflows = movements.reduce((acc, cur) => cur < 0 ? acc + cur : acc, 0);
  //Converts incomes into interests and only take the interest values greater than 1
  const interestTotal = movements
    .map((mov) => mov > 0 ? mov * interest : undefined)
    .reduce((acc, cur) => cur >= 1 ? acc + cur : acc, 0);
  labelBalance.textContent = `$${acct.balance}`
  labelSumIn.textContent = `$${incomes}`;
  labelSumOut.textContent = `$${outflows}`;
  labelSumInterest.textContent = `$${interestTotal}`;
}

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES




// for (const movement of movements) movement > 0 ? console.log(`you deposited ${movement}`) : console.log(`You withdrew ${Math.abs(movement)}`);
// /////////////////////////////////////////////////

// movements.forEach = (movement) => movement > 0 ? console.log(`you deposited ${movement}`) : console.log(`You withdrew ${Math.abs(movement)}`);

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movementsUSD);

const movementsDscr = movements.map((mov, i) => {
  const action = mov > 0 ? "deposited" : "withdrew";
  return `Movement ${i + 1}: You ${action} ${Math.abs(mov)} dollars.`
});

console.log(movementsDscr);

//Creates usernames
const createUsernames = (accounts) => {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join('');
  });
};

const updateUI = (acc) => {
  displayMovements(acc.movements);
  calcDisplaySummary(acc)
}
createUsernames(accounts);

//Current Account
let currentAccount;

//Login Button function
btnLogin.addEventListener('click', (e) => {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(" ")[0]}!`;
    containerApp.style.opacity = 100;

    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }

  else {
    labelWelcome.textContent = `Incorrect Username or Password. Please Try Again.`;
  }
});

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const loanAmt = Number(inputLoanAmount.value);
  if (loanAmt > 0
    && currentAccount.movements.some(mov => mov >= loanAmt * 0.1)
    && !currentAccount.loan) {
    currentAccount.movements.push(loanAmt);
    currentAccount.loan = -loanAmt;
    updateUI(currentAccount);
  } else { alert("You cannot request this loan amount.") }
  inputLoanAmount.value = "";
})

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = "";
  if (amount > 0
    && receiverAcc
    && currentAccount.balance >= amount
    && receiverAcc.username
    !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
})


btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentAccount.username === inputCloseUsername.value
    && currentAccount.pin === Number(inputClosePin.value)) {
    console.log("Closing Account Now");
    const index = accounts.findIndex(acc => acc.username = currentAccount.username);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started";
  }
  inputCloseUsername.value = inputClosePin.value = "";
})

btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements);
})

console.log(account1);

const withdrawal = movements.filter(mov => mov < 0);


const balance = movements.reduce((sum, cur) => sum + cur, 0);


const maxValue = movements.reduce((max, cur) => cur > max ? max = cur : max, 0)

const allAccountBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0)

console.log(allAccountBalance);

movements.sort((a, b) => a - b);

console.log(movements);