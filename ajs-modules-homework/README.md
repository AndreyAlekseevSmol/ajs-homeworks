# Домашнее задание к лекции «Модули» (Netology, ajs8)

Три отдельных проекта (по условию ДЗ каждая задача — отдельный проект/репозиторий):

## 1. Webpack — `1-webpack/`

Настройка экспорта в бандл: `src/css/style.css`, `src/js/app.js`, `src/index.html`,
`src/index.js`, `webpack.config.js` с `HTMLWebpackPlugin` и `MiniCssExtractPlugin`.

```bash
cd 1-webpack
npm install
npm run build   # сборка в dist/
npm run serve   # HTTP-сервер (http-server) для каталога dist
```

## 2. Import/Export — `2-import-export/`

Приложение разделено на модули на базе того же Webpack-шаблона:

- `src/js/domain.js` — `export default class Character`
- `src/js/game.js` — импортирует `Character`; экспортирует `Game` (default),
  `GameSavingData`, `readGameSaving`, `writeGameSaving`
- `src/js/app.js` — одним импортом: `Game`, `GameSavingData`,
  `readGameSaving as loadGame`, `writeGameSaving as saveGame`

```bash
cd 2-import-export
npm install
npm run build
npm run serve
```

## 3. ESM (задача со звёздочкой) — `3-esm/`

Нативные ESM-модули в браузере без Webpack/Babel. Зависимость — только `live-server`.

```bash
cd 3-esm
npm install
npm start       # live-server, откроется index.html
```

На базовую страницу подключается только «стартовый» модуль
`<script type="module" src="./js/app.js"></script>`,
остальные подтягиваются через `import`. В консоли браузера должно появиться
`game started`.

---

Проверено: `npm run build` для проектов 1 и 2 собирается без ошибок
(webpack 5), модули проекта 3 выполняются с выводом `game started`.
