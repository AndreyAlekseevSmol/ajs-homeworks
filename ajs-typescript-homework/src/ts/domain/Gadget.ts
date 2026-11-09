import Buyable from './Buyable';

/**
 * Базовый класс для технических гаджетов (смартфоны, ноутбуки и т.д.).
 * В отличие от электронных товаров (фильмы, книги, музыка) гаджеты
 * можно добавлять в корзину несколько раз.
 */
export default class Gadget implements Buyable {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly brand: string,
        readonly price: number,
    ) { }
}
