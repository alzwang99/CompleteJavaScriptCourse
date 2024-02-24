'use strict'

import { async } from "regenerator-runtime";

import { API_URL as api, RES_PER_PAGE as res } from "./config.js"

import { getJSON } from "./helper.js";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        resultsPerPage: res,
        page: 1,
    },
    bookmarks: [],

}

export const loadRecipe = async (id) => {

    try {
        const recipeData = await getJSON(`${api}${id}`);
        const { recipe } = recipeData.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        //Check if any of the bookmarks have the same as the recipe selected
        if (state.bookmarks.some(bkmk => bkmk.id === id)) {
            state.recipe.bookmarked = true;
        } else state.recipe.bookmarked = false;
    } catch (err) {
        throw err;
    }
}

export const loadSearchResults = async (query) => {
    try {
        state.search.query = query;
        const rawData = await getJSON(`${api}?search=${query}`);

        if (rawData.results === 0) throw new Error("We do not have any recipes for this food.");

        state.search.results = rawData.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }
        });
        state.search.page = 1;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getSearchResultsPage = (page = state.search.page) => {

    //Dealing with negative pages that work for some reason
    if (page < 0) page = 0;

    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage
    const end = (page * state.search.resultsPerPage);

    return state.search.results.slice(start, end);
}

export const updateServings = (newServings) => {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings / state.recipe.servings)
        // newQt = oldQt * newServings / oldServings
    });

    state.recipe.servings = newServings;
}

persistBookmarks = () => localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));

export const restoreBookmarks = () => {
    const storage = localStorage.getItem("bookmarks");
    if (storage) state.bookmarks = JSON.parse(storage);
}

export const toggleBookmark = (recipe) => {
    //Checks if this recipe is already bookmarked
    if (state.bookmarks.some(bkmk => bkmk.id === recipe.id)) {
        //If true, remove the recipe from the bookmarks array 
        const index = state.bookmarks.findIndex(el => el.id === recipe.id);
        state.bookmarks.splice(index, 1);
        //Is no longer bookmarked
        if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
    }
    //If the recipe hasn't been bookmarked
    else {
        //Add bookmark
        state.bookmarks.push(recipe);
        //Mark current recipe as bookmark
        if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    }
    persistBookmarks();
} 