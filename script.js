//'use strict';
// блок объявления переменных
const appData = {
     title: '',
     screens: '',
     screenPrice: 0,
     adaptive: true,
     rollback: 10,
     service1: '',
     service2: '',
     allServicePrices: 0,
     fullPrice: 0,
     servicePercentPrice: 0,
     devEarnings: 0,
     asking: function() {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
    
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        } while (!isNumber(appData.screenPrice));
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    }
};
// блок описания функции
const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num[0] !== ' ';
};

const getAllServicePrices = function(){
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
        }
        let ask =  prompt('Сколько это будет стоить?');
        while(!isNumber(ask)) {
            ask = prompt('Сколько это будет стоить?');
        }
        sum += +ask;
    }

    return sum;
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
    return  appData.title.trim()[0].toUpperCase() + appData.title.trim().toLowerCase().slice(1);
};
// блок функционала, функциональный блок
appData.asking();
appData.allServicePrices = getAllServicePrices();
appData.fullPrice = getFullPrice(+appData.screenPrice, appData.allServicePrices);
appData.devEarnings = appData.fullPrice * (appData.rollback/100); // Процент отката посреднику за работу 
appData.servicePercentPrice = getServicePercentPrices(appData.fullPrice, appData.devEarnings);
appData.title = getTitle();
//screensArr = screens.toLowerCase().split(', ');

// блок вывода в консоль, мусорный блок
console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);
