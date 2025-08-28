export const productKeys = {
  all: ['products'] as const,
  list: () => [...productKeys.all, 'list'] as const,
  detail: (productId: number) => [...productKeys.all, productId] as const,
};

export const reviewKeys = {
  all: ['reviews'] as const,
  list: (productId: number) => [...reviewKeys.all, 'by-product', productId] as const,
};
