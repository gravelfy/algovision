import { useContext, useEffect, useRef, useState } from 'react';
import { shuffle } from '../algos/shuffle';
import { triageABulles, triageInsertion } from '../algos/tri';
import Card from '../components/ui/Card';
import Chart from '../components/ui/Chart';
import { ParamsContext } from '../logic/ParamsContext';
import classes from './AlgoPage.module.css';

export default function AlgoPage() {
  const [AUCUN, ABULLES, INSERTION, TRIE] = [0, 1, 2, 3];
  const [currentAlgoState, setCurrentAlgoState] = useState(AUCUN);
  const [isTriEnabled, setIsTriEnabled] = useState(true);
  const [isMelangerEnabled, setIsMelangerEnabled] = useState(true);
  const [params, setParams] = useContext(ParamsContext);

  const chartRef = useRef();

  const pdata = JSON.parse(JSON.stringify(params));

  const [isPlayingState, setIsPlayingState] = useState(pdata.isPlaying);
  const [countState, setCountState] = useState(pdata.count);
  const [animIdxState, setAnimIdxState] = useState(pdata.animIdx);

  function melanger(pt) {
    setIsPlayingState(false);
    setAnimIdxState(0);
    if (currentAlgoState === AUCUN || currentAlgoState === TRIE) {
      chartRef.current.setState({ tableau: shuffle(pt) });
    } else {
      setCurrentAlgoState(AUCUN);
    }
    setIsTriEnabled(true);
  }

  function triABulles(pt) {
    setCurrentAlgoState(ABULLES);
    setAnimIdxState(0);
    chartRef.current.setState({ animFrames: triageABulles(pt) });
    setIsTriEnabled(false);
    setIsMelangerEnabled(false);
    setIsPlayingState(true);
  }

  function triInsertion(pt) {
    setCurrentAlgoState(INSERTION);
    setAnimIdxState(0);
    chartRef.current.setState({ animFrames: triageInsertion(pt) });
    setIsTriEnabled(false);
    setIsMelangerEnabled(false);
    setIsPlayingState(true);
  }

  function getCurrentAlgoTitle() {
    switch (currentAlgoState) {
      case ABULLES: {
        return `Tri à bulles : ${animIdxState}/${chartRef.current.state.animFrames.length.toString()}`;
      }
      case INSERTION: {
        return `Tri insertion : ${animIdxState}/${chartRef.current.state.animFrames.length.toString()}`;
      }
      case TRIE: {
        return 'Trié';
      }
      default: {
        return 'Non trié';
      }
    }
  }

  function tableauResize(n) {
    setIsTriEnabled(true);
    setCountState(countState + n);
    setAnimIdxState(0);
  }

  const timeoutRef = useRef(setTimeout);

  useEffect(() => {
    if (
      animIdxState < chartRef.current.state.animFrames.length - 1 &&
      isPlayingState
    ) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setAnimIdxState(animIdxState + 1);
      }, 30);
    } else {
      setCurrentAlgoState(AUCUN);
      setIsPlayingState(false);
      setIsMelangerEnabled(true);
    }
    if (
      animIdxState === chartRef.current.state.animFrames.length - 1 &&
      !isPlayingState
    ) {
      setCurrentAlgoState(TRIE);
    }
  }, [animIdxState, isPlayingState, AUCUN, TRIE]);

  return (
    <section>
      <h1>Tableau de {countState} éléments</h1>
      <h2>{getCurrentAlgoTitle()}</h2>
      <Card>
        <div className={classes.boutonsRow}>
          <button
            className={classes.boutonsPlusMoins}
            disabled={!isMelangerEnabled || countState < 14}
            onClick={() => {
              tableauResize(-10);
            }}
          >
            -10
          </button>

          <button
            className={classes.boutonsPlusMoins}
            disabled={!isMelangerEnabled || countState < 4}
            onClick={() => {
              tableauResize(-1);
            }}
          >
            -1
          </button>
          <button
            className={classes.boutonsPlusMoins}
            disabled={!isMelangerEnabled || countState > 199}
            onClick={() => {
              tableauResize(1);
            }}
          >
            +1
          </button>
          <button
            className={classes.boutonsPlusMoins}
            disabled={!isMelangerEnabled || countState > 191}
            onClick={() => {
              tableauResize(10);
            }}
          >
            +10
          </button>
        </div>
        <div className={classes.boutonsRow}>
          <button
            className={classes.boutonsTri}
            style={{
              fontWeight: currentAlgoState === ABULLES ? 'bold' : 'normal',
            }}
            disabled={!isTriEnabled}
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
            {currentAlgoState === AUCUN || currentAlgoState === TRIE
              ? 'Mélanger'
              : 'Arrêter'}
          </button>
          <button
            className={classes.boutonsTri}
            style={{
              fontWeight: currentAlgoState === INSERTION ? 'bold' : 'normal',
            }}
            disabled={!isTriEnabled}
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
            animFrames={[]}
          />
        }
      </Card>
      <h3>2022 François Gravel</h3>
    </section>
  );
}
