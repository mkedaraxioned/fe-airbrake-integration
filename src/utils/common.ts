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

export const scrollToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

export const convertMinutes = (minuteTime: number) => {
  const hours = Math.floor(minuteTime / 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minutes = (minuteTime % 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return hours + ':' + minutes;
};

export const formateDate = (date: Date | string) => {
  const pad = (s: any) => (s < 10 ? '0' + s : s);
  const d = new Date(date);
  return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
};

export const percentage = (actualHours: number, totalHours: number) =>
  totalHours && +((100 * actualHours) / totalHours).toFixed(2);
