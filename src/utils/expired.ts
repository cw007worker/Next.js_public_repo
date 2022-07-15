const THE_DAY_BEFORE = 7;

export const isAlmostExpired = (expiredDate: Date): boolean => {
  const nowDate = new Date();
  const diffMSec = expiredDate.getTime() - nowDate.getTime();
  const diffSec = Math.floor(diffMSec / 1000);
  const day = Math.floor(diffSec / (24 * 60 * 60));
  return day <= THE_DAY_BEFORE;
};
