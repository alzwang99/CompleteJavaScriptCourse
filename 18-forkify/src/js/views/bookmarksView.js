'use strict'

'use strict'

import View from "./View.js";

import icons from "../../img/icons.svg"

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    if (this._data.length === 0) return `
        <div class="message">
            <div>
                <svg>
                    <use href="src/img/icons.svg#icon-smile"></use>
                </svg>
            </div>
            <p>
                No bookmarks yet. Find a nice recipe and bookmark it :)
            </p>
        </div> `
    return this._data.map(this.#genMarkupResults).join("")
  }

  #genMarkupResults(result) {
    const id = window.location.hash.slice(1)

    return `
        <li class="preview">
    <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
    <figure class="preview__fig">
      <img src="${result.image}" alt="${result.title}" />
    </figure >
  <div class="preview__data">
    <h4 class="preview__title">${result.title}</h4>
    <p class="preview__publisher">${result.publisher}</p>
    <div class="preview__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
  </div>
            </a >
        </li >
  `
  }
}

export default new BookmarksView();