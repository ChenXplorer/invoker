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
  if (word.includes('-')) {
    return word.split('-');
  }
  if (word.includes('_')) {
    return word.split('_');
  }
  return word.split(' ');
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
