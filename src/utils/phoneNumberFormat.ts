const JAPANESE_NUMBER = '81';

// 電話番号をfirebase request用に整形する
// ex.. 080-0000-1111 → +8180-0000-1111
export const phoneNumberFormat = (phoneNumber: string): string => {
  let removedHeadNumber = phoneNumber.slice(1);
  let removedHeadNumberAndHyphen = removedHeadNumber.replace(/-/g, '');
  let result = `+${JAPANESE_NUMBER}${removedHeadNumberAndHyphen}`;
  return `${result}`;
};
