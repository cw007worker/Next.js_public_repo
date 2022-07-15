import React from 'react';

export type HookState = {
  isApp: boolean;
};

export const useAppState = (): HookState => {
  // アプリで見てるか判定する
  const [isApp, setIsApp] = React.useState(false);
  React.useEffect(() => {
    const ua = window.navigator.userAgent;
    if (ua.includes('WebView')) {
      setIsApp(true);
    }
  }, []);

  return {
    isApp,
  };
};
