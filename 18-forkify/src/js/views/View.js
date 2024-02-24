'use strict'

import icons from "../../img/icons.svg"

export default class View {

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this.#clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }

    //Basically grabs markup and compares the elements that are changed to only update those portions instead of the entire page
    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        //Converting from Nodelist to Array
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(this._parentElement.querySelectorAll("*"));

        newElements.forEach((newEl, i) => {

            const curEl = curElements[i]


            //Text node is the first child of the element node
            //Updates Text
            if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
                curEl.textContent = newEl.textContent
            }

            //Updates Attributes

            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
            }
        })

    }

    #clear() {
        this._parentElement.innerHTML = "";
    }

    renderSpinner = () => {
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> 
        `
        this.#clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    renderError(message) {
        const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
        `
        this.#clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
}