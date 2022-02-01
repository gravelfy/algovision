// Algo: create array
export function createArray(n) {
  //  let a = Array.from({ n }, (_, i) => i + 1);
  let a = [];
  for (var i = 1; i <= n; i++) {
    a.push(i);
  }
  return a;
}

// Algo: Fisher–Yates Shuffle
// https://bost.ocks.org/mike/shuffle/

export function shuffle(array) {
  var m = array.length,
    t,
    i;
  console.log('m', m);
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
