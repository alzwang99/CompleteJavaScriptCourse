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


const loadAll = async (a) => {
    try {

        //Create three seperate promises
        const imgs = a.map(async img => await createImg(img));
        console.log(imgs);
        //Basically r
        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);
        imgsEl.forEach(img => img.classList.add("parallel"));
    } catch (err) {
        console.log(err.message)
    }
}

const loadImg = async (src) => {
    try {
        const img = await createImg(src);
        currentImg = img;
        console.log(`Image ${src.slice(-5, -4)} has loaded`);
        await wait(3);
        currentImg.style.display = "none";
        await wait(0.5);
    } catch (err) {
        console.error(err.message);
    }
};

const loop = async () => {
    try {
        await loadImg("img/img-1.jpg");
        await loadImg("img/img-2.jpg");
        await loadImg("img/img-3.jpg");
        await loop();
    }
    catch (err) {
        console.error(err.message);
    }
}


const imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

loadAll(imgArr);