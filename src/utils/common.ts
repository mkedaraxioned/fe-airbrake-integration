export interface ClientSet {
  name: string;
  id: string;
}

export const utilClientName = (arr: any) => {
  const newArr: ClientSet[] = [];
  arr?.filter((item: any) => {
    const i = newArr.findIndex((x: any) => x === item.name);
    if (i <= -1) {
      newArr.push({ name: item.name, id: item.id });
    }
    return null;
  });
  return newArr;
};
