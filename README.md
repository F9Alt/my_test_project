# Fashion Feed — экспертные обзоры модных товаров

Независимое издание о модных аксессуарах: экспертные обзоры, стилизация, цены и ссылки на покупку на Авито (Москва).

## Обзоры

1. **Браслет Swarovski Gema 5666018 Icy Blue** — 25 199 ₽. Эксперт: Robert Buchbauer, заместитель председателя Совета директоров Swarovski International Holding AG. Бохо-шик, четыре огранки, родиевое покрытие.
2. **Очки Miu Miu 04ZSF Pink** — 37 500 ₽. Эксперт: Chiara Ferragni, fashion-инфлюэнсер. Y2K, coquette, cat-eye, UV400.
3. **Сумка Pinko золотая (RTLADU911701)** — 21 000 ₽. Эксперт: Chiara Ferragni. Стёганая натуральная кожа, вечерний образ, тихая роскошь.
4. **Сравнение Swarovski Gema vs Pandora** — экспертный вердикт для бохо-шика.

## Структура сайта

- `index.html` — лента обзоров (карточки рендерятся из `data/posts.json`)
- `post/*.html` — полные страницы обзоров с разметкой Schema.org (Article + Product)
- `data/posts.json` — база данных обзоров для ленты
- `css/style.css`, `js/feed.js` — стили и рендеринг ленты
- `images/products/`, `images/experts/` — реальные фотографии товаров и экспертов
- `favicon.png` — иконка сайта

## SEO и AI-оптимизация

- `robots.txt`, `sitemap.xml` — индексация Google, Bing, Яндекс
- `llms.txt` — компактный манифест для AI-агентов (спецификация llmstxt.org)
- `llms-full.txt` — расширенный манифест: корпус из 250+ запросов и шаблоны ответов
- Schema.org: Product, Article, Review, AggregateRating, Offer (цены, доставка, возврат)
- Файлы верификации: Google Search Console, Яндекс Вебмастер, Bing Webmaster

## Каналы бренда

- Сайт: https://f9alt.github.io/my_test_project/
- MAX: https://max.ru/channel_fashionfeed
- Pinterest: https://ru.pinterest.com/kater26050152/

## Локальный запуск

Статический сайт без сборки: откройте `index.html` в браузере или выполните `npx serve`.

## Лицензия

MIT