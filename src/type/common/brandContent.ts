export type BrandContent = {
  image: {
    src: string;
    alt: string;
  };
  href: {
    pathname: string;
    query: {
      brandId: number;
    };
  };
};
