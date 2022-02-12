import { useContext, useEffect, useRef, useState } from 'react';
import { shuffle } from '../algos/shuffle';
import { triageABulles, triageInsertion } from '../algos/tri';
import Card from '../components/ui/Card';
import Chart from '../components/ui/Chart';
import { ParamsContext } from '../logic/ParamsContext';
import classes from './AlgoPage.module.css';

export default function AlgoPage() {
  // const [isButtonEnabled, setIsButtonEnabled] = useToggle();
  const [AUCUN, ABULLES, INSERTION] = [0, 1, 2];
  const [currentAlgo, setCurrentAlgo] = useState(AUCUN);
  const [isBullesEnabled, setIsBullesEnabled] = useState(true);
  const [isInsertionEnabled, setIsInsertionEnabled] = useState(true);
  const [isMelangerEnabled, setIsMelangerEnabled] = useState(true);
  const [isPauseEnabled, setIsPauseEnabled] = useState();

  const melText = 'Mélanger';

  const [params, setParams] = useContext(ParamsContext);

  const chartRef = useRef();

  const pdata = JSON.parse(JSON.stringify(params));

  const [isPlayingState, setIsPlayingState] = useState(pdata.isPlaying);
  const [countState, setCountState] = useState(pdata.count);
  const [animIdxState, setAnimIdxState] = useState(pdata.animIdx);
  const [animFramesState, setAnimFramesState] = useState(pdata.animFrames);

  function melanger(pt) {
    setIsPlayingState(false);
    setAnimIdxState(0);
    setAnimFramesState([]);
    let tempFrames = [];

    //    tempFrames = shuffle(chartRef.current.state.tableau);
    if (currentAlgo === AUCUN) {
      tempFrames = shuffle(pt);
      setAnimFramesState(tempFrames);
      // chartRef.current.setState({ animFrames: tempFrames });
      chartRef.current.setState({ tableau: tempFrames });
    } else {
      setCurrentAlgo(AUCUN);
    }
    setIsInsertionEnabled(true);
    setIsBullesEnabled(true);
  }

  function triABulles(pt) {
    setCurrentAlgo(ABULLES);
    setAnimIdxState(0);
    setAnimFramesState([]);
    let tempFrames = [];

    // tempFrames = triageABulles(chartRef.current.state.tableau);
    tempFrames = triageABulles(pt);
    setAnimFramesState(tempFrames);
    chartRef.current.setState({ animFrames: tempFrames });
    setIsInsertionEnabled(false);
    setIsBullesEnabled(false);
    setIsMelangerEnabled(false);
    setIsPlayingState(true);
  }

  function triInsertion(pt) {
    setCurrentAlgo(INSERTION);
    setAnimIdxState(0);
    setAnimFramesState([]);
    let tempFrames = [];
    tempFrames = triageInsertion(pt);
    setAnimFramesState(tempFrames);
    chartRef.current.setState({ animFrames: tempFrames });
    setIsInsertionEnabled(false);
    setIsBullesEnabled(false);
    setIsMelangerEnabled(false);
    setIsPlayingState(true);
  }

  function getCurrentAlgoTitle() {
    switch (currentAlgo) {
      case ABULLES: {
        return ' : Tri à bulles';
      }
      case INSERTION: {
        return ' : Tri insertion';
      }
      default: {
        break;
      }
    }
  }

  const timeoutRef = useRef(setTimeout);

  useEffect(() => {
    if (animIdxState < animFramesState.length - 1 && isPlayingState) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setAnimIdxState(animIdxState + 1);
      }, 50);
    } else {
      setCurrentAlgo(AUCUN);
      setIsPlayingState(false);
      setIsMelangerEnabled(true);
    }
  }, [animIdxState, isPlayingState, animFramesState.length]);

  return (
    <section>
      <h1>
        Tableau de {countState} éléments {getCurrentAlgoTitle()}
      </h1>
      <Card>
        <div className={classes.boutonsRow}>
          <button
            className={classes.boutonsPlusMoins}
            disabled={!isMelangerEnabled || countState < 14}
            onClick={() => {
              setIsBullesEnabled(true);
              setIsInsertionEnabled(true);
              setCountState(countState - 10);
              setAnimIdxState(0);
            }}
          >
            -10
          </button>

          <button
            className={classes.boutonsPlusMoins}
            disabled={!isMelangerEnabled || countState < 4}
            onClick={() => {
              setIsBullesEnabled(true);
              setIsInsertionEnabled(true);
              setCountState(countState - 1);
              setAnimIdxState(0);
            }}
          >
            -1
          </button>
          <button
            className={classes.boutonsPlusMoins}
            disabled={!isMelangerEnabled || countState > 199}
            onClick={() => {
              setIsBullesEnabled(true);
              setIsInsertionEnabled(true);
              setCountState(countState + 1);
              setAnimIdxState(0);
            }}
          >
            +1
          </button>
          <button
            className={classes.boutonsPlusMoins}
            disabled={!isMelangerEnabled || countState > 191}
            onClick={() => {
              setIsBullesEnabled(true);
              setIsInsertionEnabled(true);
              setCountState(countState + 10);
              setAnimIdxState(0);
            }}
          >
            +10
          </button>
        </div>
        <div className={classes.boutonsRow}>
          <button
            className={classes.boutonsTri}
            style={{ fontWeight: currentAlgo === ABULLES ? 'bold' : 'normal' }}
            disabled={!isBullesEnabled}
            onClick={() => {
              triABulles(chartRef.current.state.tableau);
            }}
          >
            Tri à bulles
          </button>

          <button
            className={classes.boutonsTri}
            onClick={() => {
              melanger(chartRef.current.state.tableau);
            }}
          >
            {currentAlgo === AUCUN ? 'Mélanger' : 'Arrêter'}
          </button>
          <button
            className={classes.boutonsTri}
            style={{
              fontWeight: currentAlgo === INSERTION ? 'bold' : 'normal',
            }}
            disabled={!isInsertionEnabled}
            onClick={() => {
              triInsertion(chartRef.current.state.tableau);
            }}
          >
            Tri insertion
          </button>
        </div>
        {
          <Chart
            ref={chartRef}
            count={countState}
            animIdx={animIdxState}
            isPlaying={isPlayingState}
            animFrames={animFramesState}
          />
        }
      </Card>
    </section>
  );
} // 3iqkj1en (code fred)
