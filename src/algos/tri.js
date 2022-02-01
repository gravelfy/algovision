/* //////////// Tri-Insertion \\\\\\\\\\\\
  
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

const triageInsertion = () => {
  //
  // //stop();
  // var liste = [...ordre];
  // var historyArray: any[];
  // historyArray = [[...liste]];
  // setSortHistory(historyArray);
  // var size = liste.length;
  // for (var j = 1; j < size; j++) {
  //   let cle: any = liste[j];
  //   let i = j - 1;
  //   while (i >= 0 && liste[i] > cle) {
  //     liste[i + 1] = liste[i];
  //     i--;
  //   }
  //   liste[i + 1] = cle;
  //   historyArray.push([...liste]);
  // }
  // setSortHistory(historyArray);
  // //play();
};
