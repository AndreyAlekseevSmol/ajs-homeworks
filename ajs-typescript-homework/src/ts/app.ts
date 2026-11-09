import Cart from './service/Cart';
import Book from './domain/Book';
import MusicAlbum from './domain/MusicAlbum';
import Movie from './domain/Movie';
import Smartphone from './domain/Smartphone';

const cart = new Cart();
console.log(cart.items);

cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
cart.add(new Movie(
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
));

console.log(cart.items);

// Гаджеты можно добавлять несколько раз
const iphone = new Smartphone(2001, 'iPhone 15 Pro', 'Apple', 'A3101', 99900);
cart.add(iphone);
cart.add(iphone);

console.log(cart.items, cart.quantity(2001));
console.log('total:', cart.totalPrice(), 'with discount 10%:', cart.discountedPrice(10));
