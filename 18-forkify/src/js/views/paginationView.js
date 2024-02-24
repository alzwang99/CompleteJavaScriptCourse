'use strict'

import View from "./View.js";
import icons from "../../img/icons.svg"

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--inline");
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    }

    _generateMarkup() {
        //Checks number of pages
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        const curPage = this._data.page

        //Only Page 1
        if (curPage === numPages === 1) {
            return this.#viewButton(0);
        }
        //Page 1, with other pages
        else if (curPage === 1 && numPages > 1) {
            return this.#viewButton(2, curPage);
        }
        //Reached Last Page
        else if (curPage === numPages) {
            return this.#viewButton(1, curPage);
        }
        //Other Page with more pages

        else if (numPages > curPage && curPage >= 1) {
            return this.#viewButton(3, curPage);
        }

        else {
            console.error("This should not be possible")
            return `This page does not exist`
        }
    }

    #viewButton(dir, curPage) {
        dir = parseInt(dir);
        console.log(dir)
        switch (dir) {
            case 1:
                return `
                <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button>`;
            case 2:
                return `
                <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
                `;
            case 3:
                return `
                <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button>
                <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
                `;
            default:
                return dir;
        }
    }
}

export default new PaginationView();