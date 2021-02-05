export default function Debouncer (f, ms) {
  let timeout;
  return function (...args) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(f, ms, ...args);
  };
}
