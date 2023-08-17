export const generateClassCode = (idx: number) => {
  const index = (100000 + idx).toString();
  const result = index.slice(1);
  return result;
};
