let getPrice = (books) => {
    let price = 0;
    price = 8 * books.length;
    if (books.length > 1) {
        let nbOfDifferentBooks = countUnique(books);
        let nbSameBooks = books.length % nbOfDifferentBooks;
        let nbOfSeries = Math.trunc(books.length / nbOfDifferentBooks);
        let discount = 1;
        switch (nbOfDifferentBooks) {
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
        price = (nbOfDifferentBooks * 8 * discount) * nbOfSeries + 8 * nbSameBooks;
    }
    return parseFloat(price.toFixed(2));
};

let countUnique = (iterable) => {
    return new Set(iterable).size;
};

module.exports = getPrice;
