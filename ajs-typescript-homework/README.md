# Домашнее задание к лекции «TypeScript» (Netology, ajs8)

Проект на базе преднастроенного шаблона [ts-template](https://github.com/netology-code/ajs-homeworks/tree/ajs8/ts-template).

## Решение

### 1. Новые типы — класс `Movie`

[src/ts/domain/Movie.ts](src/ts/domain/Movie.ts) — реализует интерфейс `Buyable`
и содержит информацию о фильме как на КиноПоиске (на примере «Мстители»):
название, год, страна, слоган, жанры, длительность, мировая премьера,
возрастной рейтинг, рейтинг КиноПоиска и цена. Добавление фильма
в корзину работает и покрыто тестом.

### 2. Сумма покупки — доработан класс `Cart`

[src/ts/service/Cart.ts](src/ts/service/Cart.ts):

- `totalPrice(): number` — суммарная стоимость без учёта скидки;
- `discountedPrice(discount: number): number` — суммарная стоимость
  с учётом скидки (скидка — параметр, в процентах 0–100);
- `removeById(id: number): void` — удаление товара из корзины по полю `id`.

У всех функций указаны типы параметров и возвращаемых значений.

### 3. Список покупок (задача со звёздочкой)

- [src/ts/domain/Gadget.ts](src/ts/domain/Gadget.ts) — базовый класс гаджетов,
  [Smartphone.ts](src/ts/domain/Smartphone.ts) и [Laptop.ts](src/ts/domain/Laptop.ts) — наследники.
- В корзине электронные товары (книги, музыка, фильмы) всегда хранятся
  в единственном экземпляре, а гаджеты можно добавлять несколько раз —
  стоимость считается за все штуки (`Cart.quantity(id)` — количество единиц).
- `Cart.decreaseQuantity(id: number): void` — уменьшение количества гаджета
  в корзине (было 4 айфона — стало 3; если остался один — товар удаляется).

### Тесты

[src/ts/__tests__/Cart.test.ts](src/ts/__tests__/Cart.test.ts) — покрытие по строкам
тестируемых функций — 100% (проверяется `npm run coverage`).

## Команды

```bash
npm install
npm test          # тесты
npm run coverage  # тесты + отчёт покрытия
npm run lint      # ESLint
npm run build     # сборка Webpack в dist/
npm start         # webpack-dev-server
```
