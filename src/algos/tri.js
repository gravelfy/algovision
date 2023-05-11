export function triageInsertion(tab) {
  var animFrames = [];
  var liste = [...tab];
  animFrames = [[...liste]];
  var size = liste.length;

  for (var j = 1; j < size; j++) {
    let cle = liste[j];
    let i = j - 1;
    while (i >= 0 && liste[i] > cle) {
      liste[i + 1] = liste[i];
      i--;
    }
    liste[i + 1] = cle;
    animFrames.push([...liste]);
  }
  return animFrames;
}

export function triageABulles(tab) {
  var liste = [...tab];
  var animFrames = [];
  animFrames = [[...liste]];
  var size = liste.length;

  for (var i = 0; i < size; i++) {
    for (var j = size; j >= i + 1; j--) {
      if (liste[j] < liste[j - 1]) {
        [liste[j], liste[j - 1]] = [liste[j - 1], liste[j]];
        animFrames.push([...liste]);
      }
    }
  }
  return animFrames;
}
