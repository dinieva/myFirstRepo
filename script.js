'use strict';
console.log('hello');
const booksParent = document.querySelectorAll('.books');
const books = document.querySelectorAll('.book');
const adv = document.querySelector('.adv');
let titleOfThirdBook = books[4].querySelector('a');
let chaptersOfBookNum2 = books[0].querySelectorAll('ul > li');
let chaptersOfBookNum5 = books[5].querySelectorAll('ul > li');
let contentsBooksNum6 = books[2].querySelectorAll('ul > li');
let addChapter8inBooksNum6 = document.createElement('li');
addChapter8inBooksNum6.innerHTML = 'Глава 8: За пределами ES6';

books[0].before(books[1]);
books[2].before(books[3]);
books[3].before(books[4]);
books[2].before(books[5]);

document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

titleOfThirdBook.innerHTML = 'Книга 3. this и Прототипы Объектов';

adv.remove();


chaptersOfBookNum2[3].after(chaptersOfBookNum2[6]);
chaptersOfBookNum2[6].after(chaptersOfBookNum2[8]);
chaptersOfBookNum2[9].after(chaptersOfBookNum2[2]);

chaptersOfBookNum5[3].before(chaptersOfBookNum5[9]);
chaptersOfBookNum5[4].after(chaptersOfBookNum5[2]);
chaptersOfBookNum5[7].after(chaptersOfBookNum5[5]);

contentsBooksNum6[8].after(addChapter8inBooksNum6);