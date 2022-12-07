//'use strict';
// блок объявления переменных
let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let service1;
let service2;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let screensArr;
let devEarnings;

// блок описания функции
const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num[0] !== ' ';
};

const asking = function() {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

    screenPrice = prompt('Сколько будет стоить данная работа?');
    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!isNumber(screenPrice));

    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function(){
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');
        }
        let ask =  prompt('Сколько это будет стоить?');
        while(!isNumber(ask)) {
            ask = prompt('Сколько это будет стоить?');
        }
        sum += +ask;
    }

    return sum;
};
const showTypeof = function (variable) {
    console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
    if(price >= 30000){
        return 'Предоставлена скидка 10% ';
    } else if (price >= 15000 && price < 30000){
        return 'Предоставлена скидка 5% ';
    }  else if (price > 0 && price < 15000){
        return 'Скидка не предусмотрена';
    } else if (price <= 0) {
        return 'Что то пошло не так';
    }
};

function getFullPrice(price1, price2) {
    return price1 + price2;
}

function getServicePercentPrices(price1, price2) {
    return price1 - price2;
}

const getTitle = function () {
    return  title.trim()[0].toUpperCase() + title.trim().toLowerCase().slice(1);
};
// блок функционала, функциональный блок
asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(+screenPrice, allServicePrices);
devEarnings = fullPrice * (rollback/100); // Процент отката посреднику за работу 
servicePercentPrice = getServicePercentPrices(fullPrice, devEarnings);
title = getTitle();
screensArr = screens.toLowerCase().split(', ');

// блок вывода в консоль, мусорный блок
showTypeof(title);
showTypeof(screenPrice);
showTypeof(adaptive);

console.log('allServicePrices', allServicePrices);
console.log(screensArr);
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);

