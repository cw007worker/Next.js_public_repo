import router from 'next/router';

export const getFullPath = (): string => {
  const fullPath = `${process.env.NEXT_PUBLIC_ROOT_URL}${router.pathname}`;
  return fullPath;
};
