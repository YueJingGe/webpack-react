export default function getAlphabetList() {
  let list = [];
  for (var i = 0; i <= 25; i++) {
    list.push(String.fromCharCode(65 + i));
  }

  return list;
}
