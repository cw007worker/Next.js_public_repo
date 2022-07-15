export type Recommendation = {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  images: {
    alt: string;
    url: string;
  }[];
};
