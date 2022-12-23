'use strict';
const title = document.getElementsByTagName('h1')[0];
const btnPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const btns = document.getElementsByClassName('handler_btn');
const btnStart = btns[0];
const btnReset = btns[1];

const cmsWrapper = document.querySelector('.cms');
const cmsOpen = document.getElementById('cms-open');

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
    servicePricesPercentCMS: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        this.addTitle();
        this.rollbackRange();
        btnPlus.addEventListener('click', appData.addScreenBlock);

        this.checkScreens();
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

    cmsOpenBlock: function () {
        const cmsVariants = document.querySelector('.hidden-cms-variants');
        const cmsSelect = document.querySelector('#cms-select');
        const cmsOptions = cmsSelect.querySelectorAll('option');
        const cmsSelectName = cmsSelect.options[cmsSelect.selectedIndex].textContent;
        const mainControlInput = cmsVariants.querySelector('.main-controls__input');
        const input = mainControlInput.querySelector('#cms-other-input');

        let displayCmsVariants = () => {
            if (cmsOpen.checked) {
                cmsVariants.style.display = 'flex';
            } else {
                cmsVariants.style.display = 'none';
                input.value = '';
            }

            cmsOptions.forEach(item => {
                if (cmsSelectName === 'Другое') {
                    mainControlInput.style.display = 'block';
                } else {
                    mainControlInput.style.display = 'none';
                }
            });

            input.addEventListener('change', () => {
                appData.servicePricesPercentCMS += Number(input.value);
                console.log(appData.servicePricesPercentCMS);
            });

        };

        displayCmsVariants();

    },

    blockScreens: function () {

        screens.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.setAttribute('disabled', '');
            input.setAttribute('disabled', '');
            btnPlus.setAttribute('disabled', '');
        });
        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            check.setAttribute('disabled', '');
        });
        otherItemsNumber.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            check.setAttribute('disabled', '');
        });
        cmsOpen.setAttribute('disabled', '');
        btnStart.style.display = 'none';
        btnReset.style.display = 'block';

        btnReset.addEventListener('click', appData.reset);

    },

    reset: function () {
        screens = document.querySelectorAll('.screen');

        //appData.screens.length = 0;
        screens.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            select.removeAttribute('disabled', '');
            input.removeAttribute('disabled', '');
            btnPlus.removeAttribute('disabled', '');
            input.value = '';
            select.options[0].selected = 'selected';
        });

        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            check.removeAttribute('disabled', '');
            check.checked = false;
        });

        otherItemsNumber.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            check.removeAttribute('disabled', '');
            check.checked = false;
        });

        cmsOpen.removeAttribute('disabled', '');
        cmsOpen.checked = false;
        appData.servicePricesPercentCMS = 0;
        appData.cmsOpenBlock();


        btnStart.style.display = 'block';
        btnReset.style.display = 'none';

        //screens.length = 0;
        //screens.splice(1, screen.length - 1);
        total.value = '';
        totalCount.value = '';
        totalCountOther.value = '';
        fullTotalCount.value = '';
        totalCountRollback.value = '';

    },

    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber + appData.servicePricesCMS;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;

    },

    addScreens: function () {
        screens.forEach((screen, index) => {
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
    },
    addServices: function () {
        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemsNumber.forEach(item => {
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

    checkScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            btnStart.setAttribute('disabled', '');
            let check = () => {
                if (selectName && input.value) {
                    btnStart.removeAttribute('disabled', '');
                    // btnStart.addEventListener('click', appData.start);
                    btnStart.addEventListener('click', () => {
                        appData.start();
                        appData.blockScreens();
                    });
                } else {
                    btnStart.setAttribute('disabled', '');
                }
            };

            screen.addEventListener('change', check);
        });
    },
    rollbackRange: function () {
        totalCountRollback = document.getElementsByClassName('total-input')[4];

        inputRange.addEventListener('input', () => {
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

        appData.servicePricesCMS = +appData.screenPrice * appData.servicePricesPercentCMS / 100;
        console.log(appData.servicePricesCMS + '=' + appData.screenPrice + '*' + appData.servicePricesPercentCMS);

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent + appData.servicePricesCMS;

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
cmsWrapper.addEventListener('change', appData.cmsOpenBlock);
