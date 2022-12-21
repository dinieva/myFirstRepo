'use strict';
const title = document.getElementsByTagName('h1')[0];
const btnPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const btns = document.getElementsByClassName('handler_btn');
const btnStart = btns[0];
const btnReset = btns[1];

const rollback = document.querySelector('.rollback');
const inputRange = rollback.querySelector('[type="range"]');
const inputRangeValue = rollback.querySelector('.range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
let totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();
        appData.rollbackRange();
        btnPlus.addEventListener('click', appData.addScreenBlock);
        appData.checkScreens();
    },
    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
        appData.rollbackRange();
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;

    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value,
            });
        });
        console.log(appData.screens);
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);

        btnStart.setAttribute('disabled', '');
        appData.checkScreens();
    },
    // кнопка Рассчитать не активна
    checkScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach(function (screen) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            btnStart.setAttribute('disabled', '');
            let check = function () {
                if (selectName && input.value) {
                    btnStart.removeAttribute('disabled', '');
                    btnStart.addEventListener('click', appData.start);
                } else {
                    btnStart.setAttribute('disabled', '');
                }
            };

            screen.addEventListener('change', check);
        });
    },
    rollbackRange: function () {
        totalCountRollback = document.getElementsByClassName('total-input')[4];

        inputRange.addEventListener('input', function () {
            inputRangeValue.textContent = inputRange.value + '%';
            appData.rollback = inputRange.value;
            appData.rollbackCount();

        });
    },

    rollbackCount: function () {
        if (appData.rollback > 0) {
            totalCountRollback.value = fullTotalCount.value - (fullTotalCount.value * appData.rollback / 100);
        } else {
            totalCountRollback.value = fullTotalCount.value;
        }
    },

    addPrices: function () {
        appData.screenPrice = appData.screens.reduce((sum, screen) => sum + (+screen.price), 0);

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

        for (let elem of appData.screens) {
            totalCount.value = +totalCount.value + elem.count;
        }

    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);

    },
};

appData.init();
