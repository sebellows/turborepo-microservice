export const hasOwn = <O extends Object>(
  o: O,
  key: PropertyKey,
  strict = false
) => {
  const has = Object.prototype.hasOwnProperty.call(o, key);

  return strict ? has && !!o[key] : has;
};
