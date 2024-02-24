'use strict'

import { timeOut_sec } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(`${url}`), timeout(timeOut_sec)]);

        if (!res.ok) {
            throw new Error(`Recipe not found. Check the url.`)
        };

        const rawData = await res.json();
        return rawData;
    } catch (error) {
        console.error(error);
        throw error
    };
}