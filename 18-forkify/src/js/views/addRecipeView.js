'use strict'

import View from "./View.js"
import icons from "../../img/icons.svg"

class AddRecipeView extends View {
    _parentElement = document.querySelector(".pagination");

    _generateMarkup() { }
}

export default new AddRecipeView();