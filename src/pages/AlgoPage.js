import { useContext, useEffect, useRef, useState } from 'react';
import { triageABulles, triageInsertion } from '../algos/tri';
import Card from '../components/ui/Card';
import Chart from '../components/ui/Chart';
import { ParamsContext } from '../logic/ParamsContext';
import classes from './AlgoPage.module.css';

export default function AlgoPage() {
  const [params, setParams] = useContext(ParamsContext);

  const chartRef = useRef();

  console.log('params ', params);

  // dirty hack
  const pdata = JSON.parse(JSON.stringify(params));

  console.log('pdata', pdata);
  console.log('pdata', pdata.loopingIdx);

  const [isPlayingState, setIsPlayingState] = useState(pdata.isPlaying);
  const [countState, setCountState] = useState(pdata.count);
  const [animIdxState, setAnimIdxState] = useState(pdata.animIdx);
  //const [ordreState, setOrdreState] = useState(pdata.ordre);
  const [animFramesState, setAnimFramesState] = useState(pdata.animFrames);

  function triABulles(pt) {
    setAnimIdxState(0);
    setAnimFramesState([]);
    let tempHistory = [];

    tempHistory = triageABulles(chartRef.current.state.tableau);

    setAnimFramesState(tempHistory);

    console.log('triBulles sortHist', animFramesState);

    chartRef.current.setState({ sortHistory: tempHistory });
    console.log('triBulles ===== sortHist', animFramesState);

    setIsPlayingState(true);
  }

  function triInsertion(pt) {
    setAnimIdxState(0);
    setAnimFramesState([]);
    let tempHistory = [];

    tempHistory = triageInsertion(chartRef.current.state.tableau);

    setAnimFramesState(tempHistory);

    console.log('triInsertion sortHist', animFramesState);

    chartRef.current.setState({ sortHistory: tempHistory });
    console.log('triInsertion ===== sortHist', animFramesState);

    setIsPlayingState(true);
  }

  const timeoutRef = useRef(setTimeout);

  useEffect(() => {
    if (animIdxState < animFramesState.length - 1 && isPlayingState) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        console.log('loopingIdxState', animIdxState);
        setAnimIdxState(animIdxState + 1);
      }, 50);
    } else {
      setIsPlayingState(false);
    }
  }, [animIdxState, isPlayingState, animFramesState.length]);

  return (
    <section>
      <h1>Tableau de {countState} éléments</h1>
      <Card>
        <div className={classes.boutonsRow}>
          <button
            className={classes.boutonsPlusMoins}
            onClick={() => {
              if (countState > 10) {
                setCountState(countState - 10);
                setAnimIdxState(0);
              }
            }}
          >
            -10
          </button>

          <button
            className={classes.boutonsPlusMoins}
            onClick={() => {
              if (countState > 1) {
                setCountState(countState - 1);
                setAnimIdxState(0);
              }
            }}
          >
            -1
          </button>
          <button
            className={classes.boutonsPlusMoins}
            onClick={() => {
              if (countState < 400) {
                setCountState(countState + 1);
                setAnimIdxState(0);
              }
            }}
          >
            +1
          </button>
          <button
            className={classes.boutonsPlusMoins}
            onClick={() => {
              if (countState < 391) {
                setCountState(countState + 10);
                setAnimIdxState(0);
              }
            }}
          >
            +10
          </button>
          <button
            className={classes.boutonsTri}
            onClick={() => {
              triABulles(chartRef.current.state.tableau);
            }}
          >
            Tri à bulles
          </button>

          <button
            className={classes.boutonsTri}
            onClick={() => {
              triInsertion(chartRef.current.state.tableau);
            }}
          >
            Tri par insertion
          </button>
        </div>
        {
          <Chart
            ref={chartRef}
            count={countState}
            loopingIdx={animIdxState}
            isPlaying={isPlayingState}
            sortHistory={animFramesState}
          />
        }
      </Card>
    </section>
  );
}
