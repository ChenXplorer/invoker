export const TYPES = [
  'littleCamelCase',
  'bigCamelCase',
  'crossCase',
  'underlineCase',
  'upperCase',
  'upperCrossCase',
  'upperUnderlineCase',
];

export function wordSplit(word: string) {
  // 按- _ ' ' 及大写字母分割 
  // 无法处理SET-OF-WHEELS
  // return word.split(/[-_\s]|(?=[A-Z])/);
  const result  = word.split(/[-_\s]/);
  if(result.length === 1) {
    return (result+'').split(/(?=[A-Z])/);
  }
  return result;

}

export function getUpper(word: string) {
  const result = wordSplit(word).map((v) => {
    return v.toUpperCase();
  });
  return result;
}

export function getCamel(word: string) {
  const result = wordSplit(word).map((v, index) => {
    if (index === 0) {
      return v.toLowerCase();
    } else {
      return v.slice(0, 1).toUpperCase() + v.slice(1);
    }
  });
  return result;
}
