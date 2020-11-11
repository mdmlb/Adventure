//USER
const name = document.querySelector('.profileUser__name');
const btnStart = document.querySelector('.profileUser__start');

btnStart.addEventListener("click", function () {
    window.location.href = '../cameras.html';
});

//ADMIN
const additem = document.querySelector('.profileAdmin__aibtn');
const orders = document.querySelector('.profileAdmin__ordersbtn');

additem.addEventListener("click", function () {
    window.location.href = '../additems.html';
});

orders.addEventListener("click", function () {
    window.location.href = '../orders.html';
});