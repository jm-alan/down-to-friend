export default function DeepEqual (obj1, obj2) {
  for (const key in obj1) {
    if (!(obj2[key] === obj1[key])) return false;
  }
  for (const key in obj2) {
    if (!(obj2[key] === obj1[key])) return false;
  }
  return true;
}
