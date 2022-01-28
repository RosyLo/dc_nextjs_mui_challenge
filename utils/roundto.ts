const roundToTwo = (num: number) => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

export default roundToTwo;
