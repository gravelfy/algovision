// Algo: create array
export function createArray(n) {
  let a = [];
  for (var i = 1; i <= n; i++) {
    a.push(i);
  }
  return a;
}

// Algo: Fisher–Yates Shuffle

export function shuffle(array) {
  var m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
