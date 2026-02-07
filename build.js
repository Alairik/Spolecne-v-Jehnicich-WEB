/**
 * Build script for generating articles from Strapi CMS
 *
 * Fetches articles from Strapi API and generates:
 * 1. Individual HTML pages for each article
 * 2. Updated zpravodaj.html with article listings
 */

const fs = require('fs');
const path = require('path');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://dynamic-delight-645da9dd64.strapiapp.com';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';

// HTML Templates
const ARTICLE_TEMPLATE = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}} - Spolecne v Jehnicich</title>
  <meta name="description" content="{{description}}">
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="logo">
          <img src="images/cropped-logo-1.png" alt="Spolecne v Jehnicich" class="logo-img">
          <span class="logo-text">Spolecne v Jehnicich</span>
        </a>
        <nav class="nav">
          <a href="tym.html">Tym</a>
          <a href="program.html">Program 2026</a>
          <a href="uspechy.html">Uspechy</a>
          <a href="zpravodaj.html">Zpravodaj</a>
        </nav>
        <button class="menu-toggle" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      <nav class="mobile-nav">
        <a href="tym.html">Tym</a>
        <a href="program.html">Program 2026</a>
        <a href="uspechy.html">Uspechy</a>
        <a href="zpravodaj.html">Zpravodaj</a>
      </nav>
    </div>
  </header>

  <article class="article">
    <div class="container">
      <a href="zpravodaj.html" class="article-back">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Zpet na zpravodaj
      </a>

      <div class="article-header">
        <h1 class="article-title">{{title}}</h1>
        <p class="article-date">{{date}}</p>
      </div>

      <div class="article-content">
        {{content}}
      </div>
    </div>
  </article>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">
            <img src="images/cropped-logo-1.png" alt="Spolecne v Jehnicich" class="logo-img">
            <span class="logo-text">Spolecne v Jehnicich</span>
          </div>
          <p class="footer-description">
            Pracujeme pro lepsi Jehnice. Spojuje nas laska k obci a touha zlepsovat zivot vsech jejich obyvatel.
          </p>
        </div>
        <div>
          <h4 class="footer-title">Rychle odkazy</h4>
          <ul class="footer-links">
            <li><a href="tym.html">Nas tym</a></li>
            <li><a href="program.html">Program 2026</a></li>
            <li><a href="uspechy.html">Nase uspechy</a></li>
            <li><a href="zpravodaj.html">Zpravodaj</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-title">Kontakt</h4>
          <ul class="footer-contact">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <a href="mailto:info@spolecnevjehnicich.cz">info@spolecnevjehnicich.cz</a>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Jehnice, Brno-venkov
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Spolecne v Jehnicich. Vsechna prava vyhrazena.</p>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>`;

/**
 * Fetch articles from Strapi API
 */
async function fetchArticles() {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(`${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc`, {
    headers
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
}

/**
 * Format date to Czech format
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const monthNames = [
    'ledna', 'unora', 'brezna', 'dubna', 'kvetna', 'cervna',
    'cervence', 'srpna', 'zari', 'rijna', 'listopadu', 'prosince'
  ];

  return `${day}. ${monthNames[month - 1]} ${year}`;
}

/**
 * Format date short (for news cards)
 */
function formatDateShort(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}. ${month}. ${year}`;
}

/**
 * Convert Strapi rich text (blocks) to HTML
 */
function blocksToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks)) {
    return typeof blocks === 'string' ? blocks : '';
  }

  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        const text = block.children?.map(child => {
          let content = child.text || '';
          if (child.bold) content = `<strong>${content}</strong>`;
          if (child.italic) content = `<em>${content}</em>`;
          if (child.underline) content = `<u>${content}</u>`;
          if (child.code) content = `<code>${content}</code>`;
          return content;
        }).join('') || '';
        return `<p>${text}</p>`;

      case 'heading':
        const level = block.level || 2;
        const headingText = block.children?.map(c => c.text).join('') || '';
        return `<h${level}>${headingText}</h${level}>`;

      case 'list':
        const tag = block.format === 'ordered' ? 'ol' : 'ul';
        const items = block.children?.map(item => {
          const itemText = item.children?.map(c => c.text).join('') || '';
          return `<li>${itemText}</li>`;
        }).join('\n') || '';
        return `<${tag}>\n${items}\n</${tag}>`;

      case 'quote':
        const quoteText = block.children?.map(c => c.text).join('') || '';
        return `<blockquote>${quoteText}</blockquote>`;

      case 'image':
        const url = block.image?.url || '';
        const alt = block.image?.alternativeText || '';
        return url ? `<img src="${url}" alt="${alt}" class="article-image">` : '';

      default:
        return '';
    }
  }).join('\n');
}

/**
 * Generate slug from title if not provided
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get article data (handles both Strapi v4 and v5 formats)
 */
function getArticleData(article) {
  // Strapi v5 format (flat structure)
  if (article.title) {
    return {
      id: article.id,
      title: article.title,
      slug: article.slug || generateSlug(article.title),
      description: article.description || article.excerpt || '',
      content: article.content || article.body || '',
      publishedAt: article.publishedAt || article.createdAt,
      featured: article.featured || false,
    };
  }

  // Strapi v4 format (nested in attributes)
  const attrs = article.attributes || {};
  return {
    id: article.id,
    title: attrs.title,
    slug: attrs.slug || generateSlug(attrs.title),
    description: attrs.description || attrs.excerpt || '',
    content: attrs.content || attrs.body || '',
    publishedAt: attrs.publishedAt || attrs.createdAt,
    featured: attrs.featured || false,
  };
}

/**
 * Generate article HTML file
 */
function generateArticlePage(article) {
  const data = getArticleData(article);
  const contentHtml = blocksToHtml(data.content);

  let html = ARTICLE_TEMPLATE
    .replace(/\{\{title\}\}/g, data.title)
    .replace(/\{\{description\}\}/g, data.description)
    .replace(/\{\{date\}\}/g, formatDate(data.publishedAt))
    .replace(/\{\{content\}\}/g, contentHtml);

  const filename = `clanek-${data.slug}.html`;
  fs.writeFileSync(filename, html, 'utf8');
  console.log(`Generated: ${filename}`);

  return {
    ...data,
    filename
  };
}

/**
 * Generate zpravodaj.html with article listings
 */
function generateZpravodajPage(articles) {
  // Sort by date, newest first
  const sorted = [...articles].sort((a, b) =>
    new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  // Find featured article (first one marked as featured, or newest)
  const featured = sorted.find(a => a.featured) || sorted[0];
  const otherArticles = sorted.filter(a => a !== featured);

  // Generate featured section HTML
  const featuredHtml = featured ? `
      <!-- Featured News -->
      <a href="${featured.filename}" class="news-featured">
        <span class="news-featured-label">Aktualne resime</span>
        <h2 class="news-featured-title">${featured.title}</h2>
        <p class="news-featured-text">${featured.description}</p>
        <span class="news-featured-date">${formatDateShort(featured.publishedAt)}</span>
      </a>` : '';

  // Generate news grid HTML
  const newsGridHtml = otherArticles.length > 0 ? `
      <!-- News Grid -->
      <div class="grid grid-3">
${otherArticles.map(article => `        <a href="${article.filename}" class="card news-card">
          <h3 class="card-title">${article.title}</h3>
          <p class="card-description">${article.description}</p>
          <p class="news-date">${formatDateShort(article.publishedAt)}</p>
        </a>`).join('\n\n')}
      </div>` : '';

  const zpravodajHtml = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zpravodaj - Spolecne v Jehnicich</title>
  <meta name="description" content="Aktualni novinky a informace o deni v Jehnicich.">
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="logo">
          <img src="images/cropped-logo-1.png" alt="Spolecne v Jehnicich" class="logo-img">
          <span class="logo-text">Spolecne v Jehnicich</span>
        </a>
        <nav class="nav">
          <a href="tym.html">Tym</a>
          <a href="program.html">Program 2026</a>
          <a href="uspechy.html">Uspechy</a>
          <a href="zpravodaj.html" class="active">Zpravodaj</a>
        </nav>
        <button class="menu-toggle" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      <nav class="mobile-nav">
        <a href="tym.html">Tym</a>
        <a href="program.html">Program 2026</a>
        <a href="uspechy.html">Uspechy</a>
        <a href="zpravodaj.html" class="active">Zpravodaj</a>
      </nav>
    </div>
  </header>

  <!-- Page Hero -->
  <section class="page-hero">
    <div class="page-hero-bg" style="background-image: url('images/newsletter-hero.jpg')"></div>
    <div class="page-hero-overlay"></div>
    <div class="page-hero-content container">
      <h1 class="page-hero-title">Zpravodaj</h1>
      <p class="page-hero-subtitle">Aktualni novinky a informace o deni v Jehnicich</p>
    </div>
  </section>

  <!-- News Section -->
  <section class="section">
    <div class="container">
${featuredHtml}
${newsGridHtml}
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">
            <img src="images/cropped-logo-1.png" alt="Spolecne v Jehnicich" class="logo-img">
            <span class="logo-text">Spolecne v Jehnicich</span>
          </div>
          <p class="footer-description">
            Pracujeme pro lepsi Jehnice. Spojuje nas laska k obci a touha zlepsovat zivot vsech jejich obyvatel.
          </p>
        </div>
        <div>
          <h4 class="footer-title">Rychle odkazy</h4>
          <ul class="footer-links">
            <li><a href="tym.html">Nas tym</a></li>
            <li><a href="program.html">Program 2026</a></li>
            <li><a href="uspechy.html">Nase uspechy</a></li>
            <li><a href="zpravodaj.html">Zpravodaj</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-title">Kontakt</h4>
          <ul class="footer-contact">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <a href="mailto:info@spolecnevjehnicich.cz">info@spolecnevjehnicich.cz</a>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Jehnice, Brno-venkov
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Spolecne v Jehnicich. Vsechna prava vyhrazena.</p>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>`;

  fs.writeFileSync('zpravodaj.html', zpravodajHtml, 'utf8');
  console.log('Generated: zpravodaj.html');
}

/**
 * Main build function
 */
async function build() {
  console.log('Starting build...');
  console.log(`Strapi URL: ${STRAPI_URL}`);

  try {
    // Fetch articles from Strapi
    console.log('Fetching articles from Strapi...');
    const articles = await fetchArticles();
    console.log(`Found ${articles.length} articles`);

    if (articles.length === 0) {
      console.log('No articles found. Keeping existing zpravodaj.html');
      return;
    }

    // Generate individual article pages
    const generatedArticles = articles.map(article => generateArticlePage(article));

    // Generate zpravodaj.html
    generateZpravodajPage(generatedArticles);

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

// Run build
build();
