document.addEventListener('DOMContentLoaded', function() {
  fetch('data/posts.json')
    .then(response => response.json())
    .then(posts => {
      const feed = document.getElementById('feed');
      
      posts.forEach(post => {
        const card = createPostCard(post);
        feed.appendChild(card);
      });
    })
    .catch(error => console.error('Error loading posts:', error));
});

function createPostCard(post) {
  const article = document.createElement('article');
  article.className = 'post-card';
  
  // UTM метка для кнопки купить из карточки
  const buyLinkWithUTM = addUTMParams(post.product.buy_link, 'card', post.id);
  
  // Schema.org JSON-LD
  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify(getSchemaOrg(post));
  article.appendChild(schemaScript);
  
  // Header с экспертом
  const header = document.createElement('div');
  header.className = 'post-card-header';
  header.innerHTML = `
    <img src="${post.expert.image}" alt="${post.expert.name}" class="expert-avatar" loading="lazy">
    <div class="expert-info">
      <h3>${post.expert.name}</h3>
      <p>${post.expert.role}</p>
    </div>
  `;
  article.appendChild(header);
  
  // Фото товара
  const img = document.createElement('img');
  img.src = post.product.image;
  img.alt = post.product.name;
  img.className = 'post-card-image';
  img.loading = 'lazy';
  article.appendChild(img);
  
  // Контент
  const content = document.createElement('div');
  content.className = 'post-card-content';
  
  const title = document.createElement('h2');
  title.textContent = post.content.title;
  content.appendChild(title);
  
  const excerpt = document.createElement('p');
  excerpt.className = 'post-card-excerpt';
  excerpt.textContent = post.content.excerpt;
  content.appendChild(excerpt);
  
  const readMore = document.createElement('a');
  readMore.href = `post/${post.id}.html`;
  readMore.className = 'read-more-btn';
  readMore.textContent = 'Читать полностью →';
  content.appendChild(readMore);
  
  // Информация о продукте
  const productInfo = document.createElement('div');
  productInfo.className = 'product-info';
  
  const brand = document.createElement('div');
  brand.className = 'product-brand';
  brand.textContent = post.product.brand;
  productInfo.appendChild(brand);
  
  const price = document.createElement('div');
  price.className = 'product-price';
  price.textContent = `${post.product.price_rub.toLocaleString('ru-RU')} руб.`;
  productInfo.appendChild(price);
  
  const buyBtn = document.createElement('a');
  buyBtn.href = buyLinkWithUTM;
  buyBtn.className = 'buy-btn';
  buyBtn.target = '_blank';
  buyBtn.rel = 'noopener noreferrer';
  buyBtn.textContent = `Купить на ${post.product.marketplace}`;
  buyBtn.setAttribute('data-post-id', post.id);
  buyBtn.addEventListener('click', function() {
    trackBuyClick(post.id, 'card');
  });
  productInfo.appendChild(buyBtn);
  
  content.appendChild(productInfo);
  
  // Теги
  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'tags';
  post.content.tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = 'tag';
    tagEl.textContent = tag;
    tagsContainer.appendChild(tagEl);
  });
  content.appendChild(tagsContainer);
  
  article.appendChild(content);
  
  return article;
}

function addUTMParams(url, medium, campaign) {
  const urlObj = new URL(url);
  urlObj.searchParams.set('utm_source', 'fashionfeed');
  urlObj.searchParams.set('utm_medium', medium);
  urlObj.searchParams.set('utm_campaign', campaign);
  return urlObj.toString();
}

function getSchemaOrg(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.content.title,
    "image": [post.product.image],
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.expert.name,
      "jobTitle": post.expert.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fashion Feed",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fashion-feed.example/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://fashion-feed.example/post/${post.id}.html`
    },
    "mainEntity": {
      "@type": "Product",
      "name": post.product.name,
      "sku": post.product.article,
      "brand": {
        "@type": "Brand",
        "name": post.product.brand
      },
      "offers": {
        "@type": "Offer",
        "price": post.product.price_rub,
        "priceCurrency": "RUB",
        "availability": "https://schema.org/InStock",
        "url": post.product.buy_link
      }
    }
  };
}

function trackBuyClick(postId, medium) {
  if (typeof ym !== 'undefined') {
    ym(XXXXXXXX, 'reachGoal', `buy_click_${medium}`);
  }
  console.log(`Buy click tracked: ${postId} from ${medium}`);
}
