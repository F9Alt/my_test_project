# Fashion Feed — Экспериментальный сайт с экспертными обзорами моды

## Описание
Экспериментальный проект для проверки индексации Google, Яндекс и AI-поисковиками (Perplexity, ChatGPT Search, Яндекс Нейро).

Сайт содержит экспертные обзоры модных товаров от известных людей мира моды со ссылками на покупку на Авито.

## Структура проекта
```
fashion-feed/
├── index.html                  — главная страница (лента)
├── robots.txt                  — правила для поисковых ботов
├── sitemap.xml                 — карта сайта
├── llms.txt                    — файл для ИИ-агентов
├── css/style.css               — стили
├── js/feed.js                  — скрипт загрузки карточек
├── data/posts.json             — данные о постах
├── images/experts/             — фото экспертов
│   ├── robert-buchbauer.jpg
│   └── chiara-ferragni.jpg
├── images/products/            — фото товаров
│   ├── swarovski-gema-5666018.jpg
│   └── miu-miu-04zsf.jpg
└── post/
    ├── swarovski-gema-5666018.html
    └── miu-miu-04zsf.html
```

## Товары
1. **Браслет Swarovski Gema 5666018 Icy Blue** — обзор от Robert Buchbauer
2. **Солнцезащитные очки Miu Miu 04ZSF Pink** — обзор от Chiara Ferragni

## Локальный запуск
```bash
cd fashion-feed
python -m http.server 8000
```
Откройте http://localhost:8000 в браузере.

## Деплой

### Netlify
1. Зарегистрируйтесь на [Netlify](https://netlify.com)
2. Перетащите папку `fashion-feed` в область деплоя
3. Сайт будет доступен по адресу `https://your-site.netlify.app`

### Vercel
1. Установите Vercel CLI: `npm i -g vercel`
2. Выполните `vercel` в папке проекта
3. Следуйте инструкциям

### GitHub Pages
1. Создайте репозиторий на GitHub
2. Запушьте файлы в ветку `main`
3. Включите GitHub Pages в настройках репозитория

## SEO и AI-оптимизация
- Schema.org JSON-LD разметка на каждой странице
- Файл `llms.txt` для ИИ-агентов
- Корректный `robots.txt` с правилами для AI-ботов
- Уникальные title и description на каждой странице
- Семантическая вёрстка с тегами `<article>`, `<header>`, `<main>`

## Аналитика
Замените `XXXXXXXX` на ваш ID счётчика Яндекс.Метрики во всех HTML-файлах:
- `index.html`
- `post/swarovski-gema-5666018.html`
- `post/miu-miu-04zsf.html`
- `js/feed.js`

Настройте цели в Яндекс.Метрике:
- `buy_click_card` — клик по кнопке «Купить» из карточки ленты
- `buy_click_expert_review` — клик со страницы поста

## Изображения
Для запуска используйте placeholder'ы или добавьте реальные изображения:
- Фото экспертов: 400×400 px, квадратные
- Фото товаров: 1200×1200 px

Placeholder'ы:
- Эксперты: `https://placehold.co/400x400/e8f4f8/0066cc?text=Expert`
- Товары: `https://placehold.co/1200x1200/f5f5f5/333333?text=Product`

## Проверка
1. Google Rich Results Test: https://search.google.com/test/rich-results
2. Валидатор Яндекс: https://webmaster.yandex.ru/tools/microtest/
