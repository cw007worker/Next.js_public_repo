export const getInitialCharacter = (str: string): string | null => {
  const initialCharacter = str.slice(0, 1);
  const reg = new RegExp(/^[a-zA-Z]{1}$/);
  if (reg.test(initialCharacter)) {
    return initialCharacter.toUpperCase();
  }
  return null;
};
