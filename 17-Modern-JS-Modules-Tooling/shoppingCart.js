'use strict'

//Exporting module

const shippingCost = 10;
const cart = [];

export const addToCart = function (item, quant) {
    if (typeof quant !== "number") {
        return alert("Invalid input type for quant");
    }

    cart.push({ item, quant });
    console.log(`Added ${quant} ${item} to the cart`);
}


console.log("Exporting module")