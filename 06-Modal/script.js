'use strict';

const modal = document.querySelector('.modal');

const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".close-modal");

const btnShowModal = document.querySelectorAll(".show-modal");

const toggle = function () {
    (modal.classList.contains("hidden") && overlay.classList.contains("hidden")) ? (modal.classList.remove("hidden"), overlay.classList.remove("hidden")) : (modal.classList.add("hidden"), overlay.classList.add("hidden"));
}


for (let i = 0; i < btnShowModal.length; i++) btnShowModal[i].addEventListener('click', toggle);

btnCloseModal.addEventListener('click', toggle);

overlay.addEventListener('click', toggle);

document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") toggle();
});