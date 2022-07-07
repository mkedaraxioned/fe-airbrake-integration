export const utilClientName = (arr: any) => {
  const newArr: string[] = [];
  arr?.filter((item: any) => {
    const i = newArr.findIndex((x: any) => x === item.clientName);
    if (i <= -1) {
      newArr.push(item.clientName);
    }
    return null;
  });
  return newArr;
};
