const isBrowser = typeof window !== 'undefined';

const save = (key: string) => {
  if (!scrollY) {
    return undefined;
  }
  sessionStorage.setItem(key, String(window.scrollY));
};

const restore = (key: string) => {
  if (!isBrowser) {
    return undefined;
  }
  const scrollY = sessionStorage.getItem(key);
  if (!scrollY) {
    return undefined;
  } else {
    window.scrollTo(0, Number(scrollY));
  }
};

export const scrollY = {
  save,
  restore,
};
