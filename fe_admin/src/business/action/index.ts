export const generateCode = (str: string, idx: number) => {
  const arr1 = str.split(" ").reverse();
  const index = (1000000 + idx).toString();
  const result =
    (arr1[1] ? arr1[1].charAt(0) : "") + arr1[0].charAt(0) + index.slice(1);
  return result;
};
