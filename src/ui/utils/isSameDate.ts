export function isSameDate(dateOne: Date, dateTow: Date) {
  return dateOne.toDateString() === dateTow.toDateString();
}
