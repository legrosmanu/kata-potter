let getPrice = (books) => {

    let price = 8 * books.length;

    // here we speak about a serie, when you have multiple books which are all differents,
    // like 1,2 or 1,2,3 or 1,2,3,4 or 1,2,3,4,5

    // the books are the keys of the map, the number of copies of a book is the value.
    let mapBooks = classifyBooksIntoMap(books);
    // We get the size of each serie, and with that, we know the number of series
    let sizeOfSeries = getSizeOfSeries(mapBooks);
    let nbSeries = sizeOfSeries.length;
    // if we buy more of one book, it can be outside a serie
    let nbSameBooks = countNbBooksWithoutDiscount(mapBooks, nbSeries);

     // if we have series, we apply the discount for each series, according to the size of the serie
    if (nbSeries > 0) {
        price = 0;
        for (let i = 0; i < nbSeries; i++) {
            let discount = getDiscount(sizeOfSeries[i]);
            price += sizeOfSeries[i] * 8 * discount;
        }
        price += 8 * nbSameBooks;
    }
    return parseFloat(price.toFixed(2));

};

// The map is to have the id of the book as key, and the number of copies of this book as value.
let classifyBooksIntoMap = (books) => {
    let mapBooks = new Map();
    books.map((elt) => {
        if (!mapBooks.has(elt)) {
            mapBooks.set(elt, 1);
        } else {
            mapBooks.set(elt, mapBooks.get(elt) + 1);
        }
    });
    return mapBooks;
};

let getDiscount = (nbBooks) => {
    let discount = 1;
    switch (nbBooks) {
        case 2:
            discount = 0.95;
            break;
        case 3:
            discount = 0.90;
            break;
        case 4:
            discount = 0.80;
            break;
        case 5:
            discount = 0.75;
    }
    return discount;
};

// When we want to get the size of each series, we get the number of series.
let getSizeOfSeries = (books) => {
    let mapBooks = new Map(books);
    let noMoreASerie = false;
    let sizeSeries = new Array();
    while (!noMoreASerie) {
        let sizeSerie = 0;
        for (const [key, value] of mapBooks) {
            if (value > 0) {
                sizeSerie++;
                mapBooks.set(key, value - 1);
            }
        }
        if (sizeSerie > 1) {
            sizeSeries.push(sizeSerie);
        } else {
            noMoreASerie = true;
        }
    }
    return sizeSeries;
};

// Count the number without discount, Like when you buy multiple times the same books:
// 2,2,2 -> 3 without discount or 1,2,2,2, -> 2 without discount...
let countNbBooksWithoutDiscount = (books, nbSeries) => {
    let mapBooks = new Map(books);
    for (const [key, value] of mapBooks) {
        if (value > 0) {
            if (value > nbSeries) {
                mapBooks.set(key, value - nbSeries);
            } else {
                mapBooks.delete(key);
            }
        }
    }
    // the map contains only books outside series
    let nbBooks = 0;
    for (const [key, value] of mapBooks) {
        nbBooks += value;
    }
    return nbBooks;
}

module.exports = getPrice;
