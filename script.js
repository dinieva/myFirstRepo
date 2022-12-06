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

let screensArr = screens.toLowerCase().split(', ');
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let devEarnings = fullPrice * (rollback/100);
let servicePercentPrice = Math.ceil(fullPrice - devEarnings);
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

showTypeof(title);
showTypeof(screenPrice);
showTypeof(adaptive);
// блок функционала, функциональный блок


// блок вывода в консоль, мусорный блок
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screensArr);
console.log(screens.length);
console.log(getRollbackMessage(fullPrice));
console.log('Стоимость верстки экранов ' + screenPrice + '  рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');
console.log('Стоимость отката посреднику ' + devEarnings);
console.log('Стоимость за вычетом отката посреднику ' + servicePercentPrice);