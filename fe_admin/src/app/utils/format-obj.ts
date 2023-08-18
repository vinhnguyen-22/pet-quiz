export const getObjContainKeys = (
  obj: any,
  includeKeys: Array<string>
): any => {
  if (!obj) return {};
  const result: any = {};
  includeKeys.forEach((key) => (result[key] = obj[key]));
  return result;
};

export const getArrayOfObjContainKeys = (
  arr: Array<any>,
  includeKeys: Array<string>
) => {
  const results: Array<any> = [];
  arr.forEach((value) => {
    const newValue = getObjContainKeys(value, includeKeys);
    results.push(newValue);
  });
  return results;
};

export const formatObjByKeys = (
  obj: any,
  keys: Array<any>,
  selections: any = {}
) => {
  if (!obj) return {};
  const results: any = {};
  keys.forEach((k) => {
    let value = null;
    if (k.type === 'array') {
      value = obj[k.from] ? obj[k.from].join(', ') : '';
    } else if (k.type === 'string') {
      value = `${obj[k.from]}${k.sufix ?? ''}`;
    } else if (k.type === 'json') {
      value = obj[k.from] ? JSON.parse(obj[k.from]) : {};
    } else if (k.type === 'option') {
      value =
        selections && selections[k.from]
          ? selections[k.from].find((option: any) => option.id == obj[k.from])
            ?.name
          : '';
    } else {
      value = obj[k.from];
    }
    results[k.key] = value;
  });
  return results;
};

export const formatArrayObjByKeys = (
  items: Array<any>,
  keys: Array<any>,
  selections: any
) => {
  return items.map((item) => formatObjByKeys(item, keys, selections));
};
