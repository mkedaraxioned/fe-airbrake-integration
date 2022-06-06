export const validateText = (text:string) => {
  const textpattern = new RegExp(/^[a-zA-Z0-9_ ]*$/);
  return textpattern.test(text);
};
export const validateNumberText = (textDigit:string)=>{
  const digitPattern = new RegExp('^[0-9]+$')
  return digitPattern.test(textDigit)
}

export const numberValidate = (numbers:string) => {
  const numberPatter = new RegExp(/^[1-9]/);
  return numberPatter.test(numbers);
};

export const timeStringValidate = (numbers:string) => {
  const numberPatter = new RegExp(/^(?:[0-9]+(?:[.:][0-9]+)?|[.:][0-9]+)$/);
  return numberPatter.test(numbers);
};
