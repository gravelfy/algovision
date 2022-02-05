import { useContext, useEffect, useRef, useState } from 'react';
import { triageABulles, triageInsertion } from '../algos/tri';
import Card from '../components/ui/Card';
import Chart from '../components/ui/Chart';
import { ParamsContext } from '../logic/ParamsContext';
import classes from './AlgoPage.module.css';

export default function AlgoPage() {
  // const { isPlaying, count, looping, ordre, sortHistory } =
  //   useContext(AnimContext);

  const [params, setParams] = useContext(ParamsContext);

  const [loopingIdx, setLoopingIdx] = useState(0);

  const chartRef = useRef();

  console.log('params ', params);
  //  console.log(JSON.stringify(params));

  // dirty hack
  const pdata = JSON.parse(JSON.stringify(params));

  console.log('pdata', pdata);

  const [isPlayingState, setIsPlayingState] = useState(pdata.isPlaying);
  const [countState, setCountState] = useState(pdata.count);
  const [loopingIdxState, setLoopingIdxState] = useState(pdata.loopingIdx);
  const [ordreState, setOrdreState] = useState(pdata.ordre);
  const [sortHistoryState, setSortHistoryState] = useState(pdata.sortHistory);

  function triInsertion(pt) {
    setIsPlayingState(false);
    setSortHistoryState(triageInsertion(chartRef.current.getTableau()));
    setIsPlayingState(true);
  }

  //const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const timeoutRef = useRef(setTimeout);

  //console.log(ordre, sortHistory);
  useEffect(() => {
    setOrdreState(sortHistoryState[loopingIdxState]);
  }, [loopingIdxState, sortHistoryState]);

  useEffect(() => {
    if (loopingIdxState < sortHistoryState.length - 1 && isPlayingState) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setLoopingIdx(loopingIdx + 1);
      }, 50);
    } else {
      setIsPlayingState(false);
    }
  }, [loopingIdxState, isPlayingState, sortHistoryState.length]);

  return (
    <section>
      <h1>Visualisation d'algorithme</h1>
      <Card>
        <div className={classes.boutonsRow}>
          <button
            className={classes.boutons}
            onClick={() => {
              setCountState(countState - 1);
              params.count = params.count - 1;
              //params.count = countState;
              setParams(params);
              // Chart.setCountState(countState);
              // setOrdreState(initNombres(countState));
              // setLoopingState(0);
            }}
          >
            moins 1
          </button>

          <button
            className={classes.boutons}
            onClick={() => {
              setCountState(countState + 1);
              params.count = params.count + 1;
              setParams(params);
              // setOrdreState(initNombres(countState));
              // setLoopingState(0);
            }}
          >
            plus 1
          </button>

          <button
            className={classes.boutons}
            onClick={() => {
              triageABulles(Chart.tableau);
            }}
          >
            Tri à bulles
          </button>

          <button
            className={classes.boutons}
            onClick={() => {
              // console.log(
              //   'chartRef.current.getTableau()',
              //   chartRef.current.getTableau()
              // );
              triInsertion(chartRef.current.getTableau());
            }}
          >
            Tri par insertion
          </button>
        </div>
        {/* <div>params.count: {params.count}</div>
        <div>countState: {countState}</div> */}
        {
          <Chart
            ref={chartRef}
            countState={countState}
            loopingIdx={loopingIdx}
            sortHistoryState={sortHistoryState}
          />
        }
      </Card>
    </section>
  );
}
