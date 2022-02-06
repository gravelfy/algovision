/* // ! //////////// Tri-Insertion \\\\\\\\\\\\ ! \\

    Tri-Insertion (Tab : Tableau)
    Pour (j = 2 à n) Faire
    
    clé ← Tab[j]
    //Insérer Tab[j] dans la suite Tab[1..j-1]
    
    i ← j-1 
    TantQue (i > 0 et Tab[i] > clé) Faire
      Tab[i+1] ← Tab[i]
      i ← i - 1
    FinTantQue
    Tab[i+1] ← clé
    FinPour
  */

//const triageInsertion = (tab) => {
export function triageInsertion(tab) {
  console.log('- - - - - - - - - - triage INSERTION - - - - - - - - - - - - ');
  console.log(tab);
  var historyArray = [];
  var liste = [...tab];
  historyArray = [[...liste]];
  var size = liste.length;

  for (var j = 1; j < size; j++) {
    let cle = liste[j];
    let i = j - 1;
    while (i >= 0 && liste[i] > cle) {
      liste[i + 1] = liste[i];
      i--;
    }
    liste[i + 1] = cle;
    historyArray.push([...liste]);
  }
  console.log(historyArray);
  return historyArray;
}

/* ////////// Algo Bulles  \\\\\\\\\\\\\\\
 Tri-Bulles(Tab: Tableau, nbreElements: Entier)
 Pour (i = 1 à n) Faire
     Pour (j = n à i+1) Faire
     Si (Tab[j] < Tab[j-1]) Alors
         Permut(Tab, j, j-1)
     FinSi
     FinPour
     FinPour
 */

export function triageABulles(tab) {
  //
  var liste = [...tab];
  var historyArray = [];
  historyArray = [[...liste]];
  //setSortHistory(historyArray);
  var size = liste.length;

  for (var i = 0; i < size; i++) {
    for (var j = size; j >= i + 1; j--) {
      if (liste[j] < liste[j - 1]) {
        [liste[j], liste[j - 1]] = [liste[j - 1], liste[j]];
        historyArray.push([...liste]);
      }
    }
  }
  return historyArray;
}
