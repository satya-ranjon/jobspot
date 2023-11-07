export const dayMontYearDate = (inputDateString) => {
  const inputDate = new Date(inputDateString);

  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1;
  const year = inputDate.getUTCFullYear();

  return `${day}-${month}-${year}`;
};
