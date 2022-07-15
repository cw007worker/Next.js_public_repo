import { useEffect } from 'react';

export const useExcludeSsrCss = () => {
  useEffect(() => {
    // サーバーサイドで生成された、cssを除外する
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      //@ts-ignore TODO: 修正しよう
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
};
