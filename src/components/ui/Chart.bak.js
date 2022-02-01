import { useContext, useEffect, useRef, useState } from 'react';
import { shuffle } from '../../algos/shuffle';
import { ParamsContext } from '../../logic/ParamsContext';

const initNombres = (n) => {
  console.log('initNombres');
  // let a = shuffle(Array.from({ length }, (_, i) => i + 1));
  let a = shuffle(n);
  return a;
};

export default function Chart() {
  const [params, setParams] = useContext(ParamsContext);
  const [countState, setCountState] = useState(params.count);

  // const [isPlayingState, setIsPlayingState] = useState(params.isPlaying);

  // const [loopingState, setLoopingState] = useState(params.looping);
  // const [ordreState, setOrdreState] = useState(params.ordre);
  // const [sortHistoryState, setSortHistoryState] = useState(params.sortHistory);

  // setCountState(30);

  //   var [sortHistory, setSortHistory] = useState([[...ordre]]); // ??

  //  var size = ordre.length;

  const timeoutRef = useRef;

  // console.log('ordreState', ordreState);
  // console.log('sortHistoryState', sortHistoryState);

  useEffect(() => {
    initNombres(countState);
  }, [countState]);

  // useEffect(() => {
  //   setOrdreState(sortHistoryState[loopingState]);
  // }, [loopingState, sortHistoryState]);

  // useEffect(() => {
  //   if (loopingState < sortHistoryState.length - 1 && isPlayingState) {
  //     clearTimeout(timeoutRef.current); // maybe wrong
  //     timeoutRef.current = setTimeout(() => {
  //       setLoopingState(loopingState + 1);
  //     }, 50);
  //   } else {
  //     setIsPlayingState(false);
  //     //      setSortHistory(array);
  //   }
  //   //}, [loopingState, isPlayingState, isPlayingState]);
  // }, [loopingState, isPlayingState, sortHistoryState.length, isPlayingState]);

  // FG was commented out //
  //  const [count, setCount] = useState(30);
  //  [sortHistory, setSortHistory] = useState([[...ordre]]); // again?

  return (
    <>
      <p>Liste de {countState} nombres.</p>
      <div className="Chart">
        {/* {ordreState.map((bar) => (
          <Bar brand={bar} key={bar} />
        ))} */}
      </div>
    </>
  );
}
