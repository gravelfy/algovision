import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shuffle } from '../algos/shuffle';
import { triageABulles, triageInsertion } from '../algos/tri';
import Card from '../components/ui/Card';
import Chart from '../components/ui/Chart';
import { ParamsContext } from '../logic/ParamsContext';
import classes from './AlgoPage.module.css';

export default function AlgoPage() {
  const { t, i18n } = useTranslation();
  document.title = t('Sorting Algorithms');

  const [AUCUN, ABULLES, INSERTION, TRIE] = [0, 1, 2, 3];
  const [currentAlgoState, setCurrentAlgoState] = useState(AUCUN);
  const [isTriEnabled, setIsTriEnabled] = useState(true);
  const [isMelangerEnabled, setIsMelangerEnabled] = useState(true);
  const [params] = useContext(ParamsContext);
  //  const [params, setParams] = useContext(ParamsContext);

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
        return `${t(
          'Bubble sort'
        )} : ${animIdxState}/${chartRef.current.state.animFrames.length.toString()}`;
      }
      case INSERTION: {
        return `${t(
          'Insertion sort'
        )}  : ${animIdxState}/${chartRef.current.state.animFrames.length.toString()}`;
      }
      case TRIE: {
        return `${t('Sorted')}`;
      }
      default: {
        return `${t('Unsorted')} `;
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
      <Card>
        <div className={classes.boutonsRow}>
          <button
            className={classes.boutonsTri}
            style={{
              fontWeight: currentAlgoState === ABULLES ? 'bolder' : 'bold',
            }}
            disabled={!isTriEnabled}
            onClick={() => {
              triABulles(chartRef.current.state.tableau);
            }}
          >
            ▶ {t('Bubble sort')}
          </button>

          <button
            className={classes.boutonsTri}
            onClick={() => {
              melanger(chartRef.current.state.tableau);
            }}
          >
            {currentAlgoState === AUCUN || currentAlgoState === TRIE
              ? ' 🔀 ' + t('Shuffle')
              : ' ■ ' + t('Stop')}
          </button>
          <button
            className={classes.boutonsTri}
            style={{
              fontWeight: currentAlgoState === INSERTION ? 'bolder' : 'bold',
            }}
            disabled={!isTriEnabled}
            onClick={() => {
              triInsertion(chartRef.current.state.tableau);
            }}
          >
            ▶ {t('Insertion sort')}
          </button>
        </div>

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
        <div className={classes.textinfo}>
          {t('n_elements_array', { count: countState })} :{' '}
          {getCurrentAlgoTitle()}
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
