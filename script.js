//'use strict';
// блок объявления переменных
let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?', 12000);
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 10;
let fullPrice;
let servicePercentPrice;
let screensArr;
let devEarnings;

// блок описания функции
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

const allServicePrices = function getAllServicePrices(price1, price2) {
    return price1 + price2;
};

function getFullPrice(price1, price2) {
    return price1 + price2;
}

function getServicePercentPrices(price1, price2) {
    return price1 - price2;
}

function getTitle(str) {
    return  str.trim()[0].toUpperCase() + str.toLowerCase().slice(1);
}
// блок функционала, функциональный блок
screensArr = screens.toLowerCase().split(', ');
allServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
devEarnings = fullPrice * (rollback/100); // Процент отката посреднику за работу 
servicePercentPrice = getServicePercentPrices(fullPrice, devEarnings);

// блок вывода в консоль, мусорный блок
showTypeof(title);
showTypeof(screenPrice);
showTypeof(adaptive);

console.log(screensArr);
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
