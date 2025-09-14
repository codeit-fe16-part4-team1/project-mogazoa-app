import { MetadataRoute } from 'next';
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = process.env.DOMAIN || 'https://new-project-final.link';

  // 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // 동적 상품 페이지들
  const products = await getAllProducts();
  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages];
};

const getAllProducts = async () => {
  const products = [];
  let nextCursor = 0;
  let totalFetched = 0;
  while (true) {
    console.log(`🔄 Fetching products with cursor: ${nextCursor}`);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?cursor=${nextCursor}`,
      );
      const data = await response.json();
      console.log(`📦 Fetched ${data.list.length} products`);
      totalFetched += data.list.length;
      products.push(...data.list);

      if (!data.nextCursor) {
        console.log(`✅ Finished! Total products: ${totalFetched}`);
        break;
      }
      nextCursor = data.nextCursor;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      break;
    }
  }

  return products;
};

export default sitemap;
