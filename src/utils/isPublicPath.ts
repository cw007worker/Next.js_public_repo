import { publicRoutesForApp, publicRoutesForWeb } from 'constants/routes';

export const isPublicPathForWeb = (pathname: string) =>
  publicRoutesForWeb.some((pr) => {
    return pr.from.test(pathname);
  });

export const isPublicPathForApp = (pathname: string) =>
  publicRoutesForApp.some((pr) => {
    return pr.from.test(pathname);
  });
