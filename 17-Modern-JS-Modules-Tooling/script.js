'use-strict'

//Importing module

import { addToCart } from "./shoppingCart.js";

addToCart("Bread", 5);


// console.log("Importing module");

// import * as ShoppingCart from "./shoppingCart.js";

// ShoppingCart.addToCart("Bread", 10);

// const post = await fetch("https://jsonplaceholder.typicode.com/posts");

// const postData = await post.json();

// console.log(postData)

import cloneDeep from "lodash-es";

const state = {
    cart: [
        { product: "bread", quantity: 5 },
        { product: "milk", quantity: 2 }
    ],
    user: {
        username: "alzwang",
        premiumMember: false,
        isLoggedIn: true
    }
}

const stateDeepClone = cloneDeep(state);