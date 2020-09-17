let getPrice = require('./getPrice');

describe('getPrice', () => {
  describe('simple case', () => {

    it('should price must be 0 if we have no book in the basket', () => {
      let price = getPrice([]);
      expect(price).toBe(0)
    })

    it('should price must be 8 * x for x different books', () => {
      let price = getPrice([1]);
      expect(price).toBe(8);
      price = getPrice([1, 1]);
      expect(price).toBe(16);
      price = getPrice([1, 1, 1]);
      expect(price).toBe(24);
      price = getPrice([1, 1, 1, 1]);
      expect(price).toBe(32);
      price = getPrice([1, 1, 1, 1, 1]);
      expect(price).toBe(40);
    })

    it('should a simple discount be applied when all the books are differents', () => {
      let price = getPrice([1, 2]);
      expect(price).toBe(15.2);
      price = getPrice([1, 2, 3]);
      expect(price).toBe(21.6);
      price = getPrice([1, 2, 3, 4]);
      expect(price).toBe(25.6);
      price = getPrice([1, 2, 3, 4, 5]);
      expect(price).toBe(30);
    })

    it('should be a multiple of the simple accounts when we have only series with the same size', () => {
      let price = getPrice([1, 2, 1, 2]);
      expect(price).toBe(30.4);
      price = getPrice([1, 2, 3, 1, 2, 3]);
      expect(price).toBe(43.2);
      price = getPrice([1, 2, 3, 4, 1, 2, 3, 4]);
      expect(price).toBe(51.2);
      price = getPrice([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
      expect(price).toBe(60);
    })

    it('should just add 8 to the discount when one book is out of a serie', () => {
      let price = getPrice([1, 2, 2]);
      expect(price).toBe(23.2);
      price = getPrice([1, 2, 1, 2, 2]);
      expect(price).toBe(38.4);
      price = getPrice([1, 2, 3, 1]);
      expect(price).toBe(29.6);
      price = getPrice([1, 2, 3, 4, 2]);
      expect(price).toBe(33.6);
      price = getPrice([1, 2, 3, 4, 5, 1]);
      expect(price).toBe(38);
    })

    it('should just add 8 * x to the discount when x books is out of a serie', () => {
      let price = getPrice([1, 2, 2, 2, 2]);
      expect(price).toBe(39.2);
      price = getPrice([1, 2, 1, 2, 2, 2, 2]);
      expect(price).toBe(54.4);
    })

    it('should apply different discounts', () => {
      let price = getPrice([1, 2, 1, 2, 3]);
      expect(price).toBe(36.8);
      price = getPrice([0, 0, 1, 1]);
      expect(price).toBe(2 * (8 * 2 * 0.95));
      price = getPrice([0, 0, 1, 2, 2, 3]);
      expect(price).toBe((8 * 4 * 0.8) + (8 * 2 * 0.95));
      price = getPrice([0, 1, 1, 2, 3, 4]);
      expect(price).toBe(8 + (8 * 5 * 0.75));
    })

    it('should manage the edge cases', () => {
      expect(getPrice([0, 0, 1, 1, 2, 2, 3, 4])).toBe(2 * (8 * 4 * 0.8));
      expect(getPrice([0, 0, 0, 0, 0,
        1, 1, 1, 1, 1,
        2, 2, 2, 2,
        3, 3, 3, 3, 3,
        4, 4, 4, 4])).toBe(3 * (8 * 5 * 0.75) + 2 * (8 * 4 * 0.8));
    });

  })

})
