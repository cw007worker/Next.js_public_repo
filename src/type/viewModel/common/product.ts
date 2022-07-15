export type Product = {
  id: number;
  name: string;
  images:
    | {
        alt: string;
        url: string;
      }[]
    | undefined;
  description: string | undefined;
  hasVariety: boolean;
  hasSize: boolean;
};
