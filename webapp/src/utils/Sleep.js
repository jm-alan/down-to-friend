export default async function Sleep (ms) {
  return await new Promise(resolve => setTimeout(resolve(), ms));
}
