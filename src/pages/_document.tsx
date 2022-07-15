import React, { Children } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { googleTagManagerId } from 'libs/gtm/config';
import GoogleTagManager,  {
  GoogleTagManagerId,
} from 'components/meta/GoogleTagManager';
import GoogleTagManagerNoScript from 'components/meta/GoogleTagManager/noscript';
import Script from 'next/script';

export default class CustomDocument extends Document {
  //@ts-ignore TODO: 修正しよう
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* @see https://zenn.dev/rhirayamaaan/articles/f0209ad6574ed4 iosでinputを入力してしまう問題の解決hack*/}
          {/* <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
          /> */}
          <GoogleTagManager
            googleTagManagerId={googleTagManagerId as GoogleTagManagerId}
          />
          {/* Google fonts */}
          <Script src="https://js.stripe.com/v3/"></Script>
        </Head>
        <body>
          <GoogleTagManagerNoScript
            googleTagManagerId={googleTagManagerId as GoogleTagManagerId}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
CustomDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      //@ts-ignore TODO: 修正しよう
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
