export default function DeepEqual (obj1, obj2) {
  if (!obj1 || !obj2) return false;
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);
  if (!(entries1.length === entries2.length)) return false;
  for (let i = 0; i < entries1.length; i++) {
    if (typeof entries1[i][1] !== typeof entries2[i][1]) return false;
    if (typeof entries1[i][1] === 'object') {
      if (!DeepEqual(entries1[i][1], entries2[i][1])) return false;
    } else if (entries1[i][1] !== entries2[i][1]) return false;
  }
  return true;
}
