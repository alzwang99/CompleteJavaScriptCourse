'use strict'

const imgContainer = document.querySelector('.images');
let currentImg;

const wait = (sec) => new Promise(res => setTimeout(res, sec * 1000))

const createImg = (imgPath) => {
    return new Promise((res, rej) => {
        const imgEle = document.createElement("img");
        imgEle.src = imgPath;
        imgEle.onload = () => {
            imgContainer.append(imgEle);
            res(imgEle);
        };
        imgEle.onerror = () => {
            rej(new Error("Image not valid"))
        }
    })
}

const loadImg = (src) => {
    return createImg(src)
        .then(img => {
            currentImg = img;
            console.log(`Image ${src.slice(-5, -4)} has loaded`);
            return wait(3);
        }).then(() => {
            currentImg.style.display = "none";
            return wait(0.5)
        });
}

const loop = () => {
    return loadImg("img/img-1.jpg")
        .then(() => {
            return loadImg("img/img-2.jpg")
        })
        .then(() => {
            return loadImg("img/img-3.jpg");
        })
        .then(loop)
        .catch((err) => console.error(err))
};

loop();