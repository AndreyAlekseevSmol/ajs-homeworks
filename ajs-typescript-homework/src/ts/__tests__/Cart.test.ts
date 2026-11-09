import Cart from '../service/Cart';
import Movie from '../domain/Movie';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';
import Smartphone from '../domain/Smartphone';
import Laptop from '../domain/Laptop';

describe('Cart', () => {
  const avengers = new Movie(
    1009,
    'Мстители',
    2012,
    'США',
    'Some assembly required',
    'фантастика, боевик, фэнтези, приключения',
    '143 мин. / 02:23',
    '11 апреля 2012',
    '12+',
    7.997,
    350,
  );

  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);
  const album = new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900);

  describe('базовое поведение', () => {
    test('new card should be empty', () => {
      const cart = new Cart();

      expect(cart.items.length).toBe(0);
    });

    test('items should return a copy of the items array', () => {
      const cart = new Cart();
      cart.add(book);

      const items = cart.items;
      items.pop();

      expect(cart.items.length).toBe(1);
    });

    test('movie can be added to the cart', () => {
      const cart = new Cart();
      cart.add(avengers);

      expect(cart.items).toContain(avengers);
      expect(cart.items.length).toBe(1);
    });
  });

  describe('totalPrice', () => {
    test('should return the sum without discount', () => {
      const cart = new Cart();
      cart.add(book);
      cart.add(album);

      expect(cart.totalPrice()).toBe(2900);
    });

    test('should return 0 for an empty cart', () => {
      const cart = new Cart();

      expect(cart.totalPrice()).toBe(0);
    });
  });

  describe('discountedPrice', () => {
    test('should apply the discount to the total price', () => {
      const cart = new Cart();
      cart.add(book);
      cart.add(album);

      expect(cart.discountedPrice(50)).toBe(1450);
      expect(cart.discountedPrice(10)).toBeCloseTo(2610);
    });
  });

  describe('removeById', () => {
    test('should remove an item by id', () => {
      const cart = new Cart();
      cart.add(book);
      cart.add(album);
      cart.removeById(1001);

      expect(cart.items).toEqual([album]);
    });

    test('should do nothing if the id is not found', () => {
      const cart = new Cart();
      cart.add(book);
      cart.removeById(9999);

      expect(cart.items).toEqual([book]);
    });
  });

  describe('гаджеты (задача со звёздочкой)', () => {
    const iphone = new Smartphone(
      2001,
      'iPhone 15 Pro',
      'Apple',
      'A3101',
      99900,
    );
    const macbook = new Laptop(
      2002,
      'MacBook Air 13"',
      'Apple',
      '13.6"',
      129900,
    );

    test('электронные товары хранятся в корзине в единственном экземпляре', () => {
      const cart = new Cart();
      cart.add(book);
      cart.add(book);

      expect(cart.items.length).toBe(1);
      expect(cart.quantity(1001)).toBe(1);
    });

    test('гаджеты можно добавлять несколько раз', () => {
      const cart = new Cart();
      cart.add(iphone);
      cart.add(iphone);
      cart.add(iphone);

      expect(cart.items.length).toBe(1);
      expect(cart.quantity(2001)).toBe(3);
    });

    test('totalPrice учитывает количество гаджетов', () => {
      const cart = new Cart();
      cart.add(iphone);
      cart.add(iphone);
      cart.add(macbook);

      expect(cart.totalPrice()).toBe(99900 * 2 + 129900);
    });

    test('decreaseQuantity уменьшает количество гаджета', () => {
      const cart = new Cart();
      cart.add(iphone);
      cart.add(iphone);
      cart.add(iphone);
      cart.decreaseQuantity(2001);

      expect(cart.quantity(2001)).toBe(2);
    });

    test('decreaseQuantity удаляет гаджет, когда он остался в единственном экземпляре', () => {
      const cart = new Cart();
      cart.add(iphone);
      cart.decreaseQuantity(2001);

      expect(cart.items.length).toBe(0);
    });

    test('decreaseQuantity ничего не делает с неизвестным id', () => {
      const cart = new Cart();
      cart.add(book);
      cart.decreaseQuantity(9999);

      expect(cart.items.length).toBe(1);
    });

    test('removeById удаляет гаджет вместе с его количеством', () => {
      const cart = new Cart();
      cart.add(iphone);
      cart.add(iphone);
      cart.add(macbook);
      cart.removeById(2001);

      expect(cart.items).toEqual([macbook]);
      expect(cart.quantity(2001)).toBe(1);
      expect(cart.totalPrice()).toBe(129900);
    });

    test('гаджеты с одинаковым id, но разные, не дублируются в корзине', () => {
      const iphoneCopy = new Smartphone(
        2001,
        'iPhone 15 Pro',
        'Apple',
        'A3101',
        99900,
      );
      const cart = new Cart();
      cart.add(iphone);
      cart.add(iphoneCopy);

      expect(cart.items.length).toBe(1);
      expect(cart.quantity(2001)).toBe(2);
    });
  });
});
