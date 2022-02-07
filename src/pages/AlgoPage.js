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

  //const [loopingIdx, setLoopingIdx] = useState(0);

  const chartRef = useRef();
  //const chartRef = createRef();

  console.log('params ', params);
  //  console.log(JSON.stringify(params));

  // dirty hack
  const pdata = JSON.parse(JSON.stringify(params));

  console.log('pdata', pdata);
  console.log('pdata', pdata.loopingIdx);

  const [isPlayingState, setIsPlayingState] = useState(pdata.isPlaying);
  const [countState, setCountState] = useState(pdata.count);
  const [loopingIdxState, setLoopingIdxState] = useState(pdata.loopingIdx);
  const [ordreState, setOrdreState] = useState(pdata.ordre);
  const [sortHistoryState, setSortHistoryState] = useState(pdata.sortHistory);

  function triABulles(pt) {
    //setIsPlayingState(false);
    setLoopingIdxState(0);
    setSortHistoryState([]);
    let tempHistory = [];

    tempHistory = triageABulles(chartRef.current.state.tableau);

    setSortHistoryState(tempHistory);

    console.log('triBulles sortHist', sortHistoryState);
    //console.log('chartRef.current.getTableau()', chartRef.current.getTableau());
    chartRef.current.setState({ sortHistory: tempHistory });
    console.log('triBulles ===== sortHist', sortHistoryState);

    setIsPlayingState(true);
  }

  function triInsertion(pt) {
    //setIsPlayingState(false);
    setLoopingIdxState(0);
    setSortHistoryState([]);
    let tempHistory = [];

    tempHistory = triageInsertion(chartRef.current.state.tableau);
    // console.log(
    //   'triInsertion chartRef.current.state.tableau',
    //   chartRef.current.state.tableau
    // );
    // console.log('triInsertion tempHistory  ', tempHistory);

    setSortHistoryState(tempHistory);

    // setSortHistoryState(() => {
    //   return triageInsertion(chartRef.current.state.tableau);
    // });
    console.log('triInsertion sortHist', sortHistoryState);
    //console.log('chartRef.current.getTableau()', chartRef.current.getTableau());
    chartRef.current.setState({ sortHistory: tempHistory });
    console.log('triInsertion ===== sortHist', sortHistoryState);

    setIsPlayingState(true);
  }

  //const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const timeoutRef = useRef(setTimeout);

  useEffect(() => {
    console.log('Premier render ------------------');
  }, []);

  //console.log(ordre, sortHistory);
  // useEffect(() => {
  //   console.log('useEffect 2 ');
  //   console.log(sortHistoryState);
  //   setOrdreState(sortHistoryState[loopingIdxState]);
  // }, [sortHistoryState, loopingIdxState]);

  useEffect(() => {
    console.log('useEffect 3 !!!');
    console.log('isPlayingState', isPlayingState);
    console.log('loopingIdxState', loopingIdxState);
    console.log('sortHistoryState.length - 1', sortHistoryState.length - 1);

    if (loopingIdxState < sortHistoryState.length - 1 && isPlayingState) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        console.log('loopingIdxState', loopingIdxState);
        setLoopingIdxState(loopingIdxState + 1);
      }, 300);
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
              setLoopingIdxState(0);
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
              setLoopingIdxState(0);
            }}
          >
            plus 1
          </button>

          <button
            className={classes.boutons}
            onClick={() => {
              triABulles(chartRef.current.state.tableau);
            }}
          >
            Tri à bulles
          </button>

          <button
            className={classes.boutons}
            onClick={() => {
              triInsertion(chartRef.current.getTableau());
              console.log(chartRef.current.state.tableau);
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
            count={countState}
            loopingIdx={loopingIdxState}
            isPlaying={isPlayingState}
            sortHistory={sortHistoryState}
          />
        }
      </Card>
      {/* <div>{chartRef.current.state.tableau}</div> */}
    </section>
  );
}
