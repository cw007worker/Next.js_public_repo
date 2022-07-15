export type BannerContentOnlyImage = {
  image: {
    src: string;
    alt: string;
  };
};

export type BannerContent = {
  image: {
    src: string;
    alt: string;
  };
  href: {
    pathname: string;
    query?:
      | {
          categoryId: number;
          displayColor?: boolean;
        }
      | {
          brandId: number;
          displayColor?: boolean;
        }
      | {
          productId: number;
          unitId: number;
        }
      | {
          tag: number;
        }
      | {
          sort: string;
        }
  };
};

export type BannerContents = (BannerContent | BannerContentOnlyImage)[];
