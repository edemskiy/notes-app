export function isSubstr(str, strToInclude) {
  return str.toLowerCase().includes(strToInclude.toLowerCase());
}

export function formatDate(date) {
  return new Date(date).toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
