export default function Sleep (ms) {
  return new Promise(resolve => setTimeout(resolve(), ms));
}
