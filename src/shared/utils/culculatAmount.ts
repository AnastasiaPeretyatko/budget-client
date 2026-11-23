export function culculationAmount(str: string) {
  const arrAmount = str.match(/[+-]?\d+/g);

  return arrAmount?.reduce((acc, item) => acc + Number(item), 0)
}
