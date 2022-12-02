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

let screensArr = screens.toLowerCase().split(',');
console.log(screensArr);

let devEarnings = fullPrice * (rollback/100);
console.log('Процент отката посреднику за работу составляет '+ devEarnings);