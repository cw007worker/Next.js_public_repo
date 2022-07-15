export type OrderItem = {
  id: number;
  productId: number;
  unitId: number;
  name: string;
  unitPrice: number;
  unitOriginalPrice: number;
  quantity: number;
  image: {
    alt: string;
    url: string | undefined;
  };
};
