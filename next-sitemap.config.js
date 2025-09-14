export const siteUrl = process.env.DOMAIN || 'https://new-project-final.link';
export const generateRobotsTxt = true;
export const changefreq = 'daily';
export const priority = 0.7;
export const sitemapSize = 5000;
export const exclude = [
  '/signup',
  '/signin',
  '/oauth',
  '/api/*',
  '/test/*',
  '/404',
  '/500',
  '/mypage',
];

export const transform = async (config, path) => {
  const customPriorities = {
    '/': 1.0,
    '/compare': 0.9,
  };

  if (customPriorities[path]) {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: customPriorities[path],
      lastmod: new Date().toISOString(),
    };
  }

  // 나머지는 기본값 사용
  return {
    loc: path,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: new Date().toISOString(),
  };
};
export async function additionalPaths() {
  const paths = [];
  let nextCursor = 0;

  while (true) {
    console.log(`🔄 Fetching products with cursor: ${nextCursor}`);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?cursor=${nextCursor}`,
      );
      const data = await response.json();
      console.log(`📦 Fetched ${data.list.length} products`);

      data.list.forEach((product) => {
        paths.push({
          loc: `/products/${product.id}`,
          lastmod: product.updatedAt,
          changefreq: 'weekly',
          priority: 0.7,
        });
      });

      if (!data.nextCursor) {
        console.log(`✅ Finished! Total products: ${totalFetched}`);
        break;
      }

      nextCursor = data.nextCursor;
    } catch (error) {
      console.error('❌ Failed to fetch products for sitemap:', error);
      break;
    }
  }
  console.log(`✅ Generated ${paths.length} product URLs for sitemap`);
  return paths;
}
