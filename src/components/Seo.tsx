import React, { FC } from 'react';

type Props = {
  pageTitle: string;
  pageDescription?: string;
  pagePath: string;
  pageImgPath?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
};

const Seo: FC<Props> = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImgPath,
  pageImgWidth,
  pageImgHeight,
}) => {
  const defaultpageDescription =
    'Pantrii（パントリー）は、話題のコスメやファッションが会員限定価格でお得に買える会員制のショッピングサイトです。';
  const defaultPageImg = '/Head/OGPImage.jpg';
  const defaultPageImgWidth = 600;
  const defaultPageImgHeight = 314;

  const title = pageTitle;
  const description = pageDescription
    ? `${pageDescription}`
    : defaultpageDescription;
  const url = `${process.env.NEXT_PUBLIC_ROOT_URL}${pagePath}`;
  const imgUrl = pageImgPath
    ? `${process.env.NEXT_PUBLIC_ROOT_URL}${pageImgPath}`
    : `${process.env.NEXT_PUBLIC_ROOT_URL}${defaultPageImg}`;
  const imgWidth = pageImgWidth ? pageImgWidth : defaultPageImgWidth;
  const imgHeight = pageImgHeight ? pageImgHeight : defaultPageImgHeight;

  return (
    <React.Fragment>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
      {/* Facebook ドメイン認証: https://www.facebook.com/business/help/321167023127050 */}
      <meta name="facebook-domain-verification" content="h3hdbj6ygk4h6gjs2ezpb2ewzo49a0" />
    </React.Fragment>
  );
};

export default Seo;
