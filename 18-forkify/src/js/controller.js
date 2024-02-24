//Polyfilling for everything else
import "core-js/stable";

//Polyfilling for async/await
import "regenerator-runtime/runtime"

import * as model from "./model.js";

import recipeView from "./views/recipeView.js"

import searchView from "./views/searchView.js";

import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  //Creating recipe
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //This helps mark the new recipe we selected from Search results
    resultsView.update(model.getSearchResultsPage());

    //Updates the bookmarks we have added

    bookmarksView.update(model.state.bookmarks);

    //Load Recipe
    await model.loadRecipe(id);

    const { recipe } = model.state;

    //Render recipe
    recipeView.render(recipe);

  } catch (err) {
    console.log(recipeView._parentElement);
    recipeView.renderError(err)
  }
};

const controlSearchResults = async function () {
  try {
    //Get data from search bar
    const query = searchView.getQuery();
    if (!query) return;
    //Activate spinner while loading search
    resultsView.renderSpinner();
    //Sends promise if search input is valid
    await model.loadSearchResults(query);

    //If valid render the result into search result
    resultsView.render(model.getSearchResultsPage(1));
    //Page buttons base on results
    paginationView.render(model.state.search)

  } catch (err) {
    resultsView.renderError(err);
  }
}

//Changes page using buttons
const controlPagination = function (goToPage) {
  //Renders new page result
  resultsView.render(model.getSearchResultsPage(goToPage));
  //Renders new page buttons
  paginationView.render(model.state.search)
}

const controlServings = function (newServings) {
  // Update the recipe servings (within state)

  model.updateServings(newServings);

  //Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlBookmarks = function () {
  model.restoreBookmarks(); // first we load
  bookmarksView.render(model.state.bookmarks); // then we render
};

const controlAddBookmark = function () {
  //Toggle Bookmarks
  model.toggleBookmark(model.state.recipe);
  //Update Recipe View
  recipeView.update(model.state.recipe);
  //Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
}
init();


controlSearchResults();