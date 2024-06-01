export function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedDate = `${formattedMonth}/${formattedDay}/${year}`;
  return formattedDate;
}
