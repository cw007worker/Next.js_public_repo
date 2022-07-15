export const zipcodeFormat = (zipcode: string): string => {
  const former = zipcode.slice(0, 3);
  const latter = zipcode.slice(3);
  return former + '-' + latter;
};
