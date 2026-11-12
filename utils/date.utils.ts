const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_MS = 864e5;

function parseDay(date: string) {
  return new Date(`${date.slice(0, 10)}T00:00:00Z`);
}

export function shortDate(date: string) {
  const value = parseDay(date);
  return `${MONTHS[value.getUTCMonth()].slice(0, 3)} ${value.getUTCDate()}, ${value.getUTCFullYear()}`;
}

export function longDate(date: string) {
  const value = parseDay(date);
  return `${MONTHS[value.getUTCMonth()]} ${value.getUTCDate()}, ${value.getUTCFullYear()}`;
}

export function validThrough(days: number, now = Date.now()) {
  return `${new Date(now + days * DAY_MS).toISOString().slice(0, 10)}T23:59:59Z`;
}
