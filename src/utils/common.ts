import { format } from 'date-fns';

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
  actualHours && totalHours && +Math.floor((100 * actualHours) / totalHours);

export const getTimeInHours = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const HH = hours < 10 ? `0${hours}` : hours;
  const MM = minutes < 10 ? `0${minutes}` : minutes;
  return `${HH}:${MM}`;
};

export const createPdfTitle = (
  projectName: string | undefined,
  milestoneName: string | undefined,
) => {
  const date = format(new Date(), 'yyyy-MM-dd');
  return `${projectName}-${milestoneName}-${date}`;
};

export const getIndexesBasedOnValues = (array: any) =>
  Array.isArray(array)
    ? array.map((item: any, i: number) => i)
    : Array.from(array).map((item: any, i: number) => i);

export const minutesToDecimal = (n: number) => {
  const result = parseFloat(n.toString()) / 60;
  return result.toFixed(2);
};

export const hoursToDecimal = (val: string) => {
  const arr = val.split(':');
  const result = parseInt(arr[0], 10) * 1 + parseInt(arr[1], 10) / 60;
  return result;
};

export const removeItem = (arr: number[], index: number) => {
  let list: number[] = [];
  arr.splice(arr.indexOf(index), 1);
  if (arr.length) {
    list = arr;
    return list;
  } else {
    return list;
  }
};

export const decreaseItem = (arr: number[], index: number, length: number) => {
  let list: number[] = [];
  arr.splice(arr.indexOf(index), 1);
  list = arr.map((item) => {
    if (item > length) {
      return item - 1;
    } else {
      return item;
    }
  });
  return list;
};
