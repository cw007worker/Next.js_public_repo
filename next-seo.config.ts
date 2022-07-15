const rootUrl = `${process.env.NEXT_PUBLIC_ROOT_URL}`;
const defaultTitle = 'Pantrii（パントリー）'
const defaultpageDescription =
    'Pantrii（パントリー）は、話題のコスメやファッションが会員限定価格でお得に買える会員制のショッピングサイトです。';

export default {
  titleTemplate: `${defaultTitle} | %s`,
  defaultTitle: `${defaultTitle} | 会員限定でお得に楽しくお買い物しよう！`,
  canonical: rootUrl,
  description: defaultpageDescription,
  additionalMetaTags: [
    {
      name: "facebook-domain-verification",
      content: "h3hdbj6ygk4h6gjs2ezpb2ewzo49a0"
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap",
      rel: "stylesheet",
    }
  ],
  openGraph: {
    url: rootUrl,
    type: 'website',
    locale: 'ja_JP',
    site_name: defaultTitle,
    images: [
      {
        url: '/Head/OGPImage.jpg',
        width: 800,
        height: 600,
        alt: 'DefaultOGPImage',
    }],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};
