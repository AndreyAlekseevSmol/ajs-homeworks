import Buyable from '../domain/Buyable';
import Gadget from '../domain/Gadget';

export default class Cart {
    private _items: Buyable[] = [];
    private _quantities: Map<number, number> = new Map();

    add(item: Buyable): void {
        const index: number = this._items.findIndex(
            (existing: Buyable) => existing.id === item.id,
        );

        if (item instanceof Gadget) {
            // Гаджеты можно добавлять в корзину несколько раз
            if (index === -1) {
                this._items.push(item);
            }
            const current: number | undefined = this._quantities.get(item.id);
            this._quantities.set(item.id, current === undefined ? 1 : current + 1);
            return;
        }

        // Электронные товары всегда хранятся в корзине в единственном экземпляре
        if (index !== -1) {
            return;
        }

        this._items.push(item);
    }

    get items(): Buyable[] {
        return [...this._items];
    }

    /**
     * Количество единиц товара с указанным id в корзине
     */
    quantity(id: number): number {
        return this._quantities.get(id) ?? 1;
    }

    /**
     * Суммарная стоимость без учёта скидки
     */
    totalPrice(): number {
        return this._items.reduce(
            (total: number, item: Buyable) => total + item.price * this.quantity(item.id),
            0,
        );
    }

    /**
     * Суммарная стоимость с учётом скидки (в процентах: 0–100)
     */
    discountedPrice(discount: number): number {
        return this.totalPrice() * (1 - discount / 100);
    }

    /**
     * Удаление товара из корзины по полю id
     */
    removeById(id: number): void {
        this._items = this._items.filter((item: Buyable) => item.id !== id);
        this._quantities.delete(id);
    }

    /**
     * Уменьшение количества гаджета в корзине на единицу
     * (если товар остался в единственном экземпляре — удаляет его из корзины)
     */
    decreaseQuantity(id: number): void {
        const current: number = this.quantity(id);

        if (current === 1) {
            this.removeById(id);
            return;
        }

        this._quantities.set(id, current - 1);
    }
}
