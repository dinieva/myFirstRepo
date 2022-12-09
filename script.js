//'use strict';
// блок объявления переменных
const appData = {
     title: function(){
        getTitle();
     },
     screens: '',
     screenPrice: 0,
     adaptive: true,
     rollback: 10,
     service1: '',
     service2: '',
     allServicePrices:  function() {
        return appData.getAllServicePrices();
     },
     fullPrice: function(){
        return appData.getFullPrice();
     },
     servicePercentPrice: function(){
        return appData.getServicePercentPrices();
     },
     devEarnings: function(){
        return appData.fullPrice() * (appData.rollback/100);
     },
     asking: function() {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
    
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        } while (!appData.isNumber(appData.screenPrice));
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    getAllServicePrices: function(){
        let sum = 0;
    
        for (let i = 0; i < 2; i++) {
    
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
            }
            let ask =  prompt('Сколько это будет стоить?');
            while(!appData.isNumber(ask)) {
                ask = prompt('Сколько это будет стоить?');
            }
            sum += +ask;
        }
    
        return sum;
    },
    getRollbackMessage: function (price) {
        if(price >= 30000){
            return 'Предоставлена скидка 10% ';
        } else if (price >= 15000 && price < 30000){
            return 'Предоставлена скидка 5% ';
        }  else if (price > 0 && price < 15000){
            return 'Скидка не предусмотрена';
        } else if (price <= 0) {
            return 'Что то пошло не так';
        }
    },
    getFullPrice: function () {
        return +appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrices: function() {
        return appData.fullPrice - appData.devEarnings();
    },
    getTitle: function () {
        return  appData.title.trim()[0].toUpperCase() + appData.title.trim().toLowerCase().slice(1);
    },
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num) && num[0] !== ' ';
    },


    start: function(){
        appData.asking();
        appData.allServicePrices();
        appData.fullPrice();
        appData.servicePercentPrice();
        appData.logger();
    },
    logger: function(){
        for(let key in appData){
            console.log('Свойства и методы ' + key );
        }
        
    },
};

appData.start();
