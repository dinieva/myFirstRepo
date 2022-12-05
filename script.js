// Задание 1
let title = 'Типы данных Js';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 5000;
let rollback = 30;
let fullPrice = 10000;
let adaptive = true;

// Задание 2 
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log('Стоимость верстки экранов ' + screenPrice + '  рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');

let screensArr = screens.toLowerCase().split(', ');
console.log(screensArr);

/* let devEarnings = fullPrice * (rollback/100);
console.log('Процент отката посреднику за работу составляет '+ devEarnings); */

// lesson 3
title = prompt('Как называется ваш проект?');
screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
screenPrice = +prompt('Сколько будет стоить данная работа?', 12000);
adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let  servicePrice1 = +prompt('Сколько это будет стоить?');

let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

fullPrice = screenPrice + servicePrice1 + servicePrice2;

let devEarnings = fullPrice * (rollback/100);
console.log('Стоимость отката посреднику ' + devEarnings);

let servicePercentPrice = Math.ceil(fullPrice - devEarnings);
console.log('Стоимость за вычетом отката посреднику ' + servicePercentPrice);

if(fullPrice >= 30000){
    fullPrice = fullPrice - (fullPrice * 10 / 100);
    console.log('Общая стоимость с учетом скидки 10% ' + fullPrice);
} else if (fullPrice >= 15000 && fullPrice < 30000){
    fullPrice = fullPrice - (fullPrice * 5 / 100);
    console.log('Общая стоимость с учетом скидки 5% ' + fullPrice);
}  else if (fullPrice > 0 && fullPrice < 15000){
    console.log('Скидка не предусмотрена');
} else if (fullPrice <= 0) {
    console.log('Что то пошло не так');
}

