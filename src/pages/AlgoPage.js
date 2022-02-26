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
            <div className={classes.icon}>▶</div> {t('Bubble sort')}
          </button>

          <button
            className={classes.boutonsTri}
            onClick={() => {
              melanger(chartRef.current.state.tableau);
            }}
          >
            {currentAlgoState === AUCUN || currentAlgoState === TRIE ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11px"
                  height="11px"
                  viewBox="-0.5 -0.5 16 16"
                  content='&lt;mxfile host="Electron" modified="2022-02-26T23:16:37.659Z" agent="5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) draw.io/15.8.7 Chrome/91.0.4472.164 Electron/13.6.2 Safari/537.36" etag="UfI8Gt0LXesU7T0Q91hM" version="15.8.7" type="device"&gt;&lt;diagram id="rxYBLjGZQfBaCaaoXt3e" name="Page-1"&gt;7VVNc4IwEP01HNsJoNYerdX20M449eA5JRFSA+uEANpf32CWL9G2zthbOTDk7du3y+4bcPxpvHtSdBu9AuPS8QjbOf6j43nD0b25l8DeAv4AgVAJZiG3AZbikyNIEM0E42mHqAGkFtsuGECS8EBbDHOpUlCkHWgNslt1S0PeA5YBlX10JZiOEHUJaQLPXIQRlh4PMRDTioxAGlEGRQvyZ44/VQDaPsW7KZfl7Kq52Lz5mWjdmOKJ/k3CWmRiPoheJgvx9rHaPLB8V9wMrEpOZYYvjM3qfTWBIFM5LzVcx3/gCZuUUzXHdwnBxkCRjiVGFWQJO3CJOaVawaaemkts+lzIim4JU5CgDqX8+eEyEdsEZ73dNC/r1iM01uMQc632hlI0S6o2EbXWU2GKS6pF3pWn6JWwlqsrLECYwh5BW3vV+tHV7h3pSqSQqYBjVnspx0LjrlDjXRTSVIVc94TMEui+RduWhPSbhr3TDZ/ta3C6L+SbB9tBdWrtoIEOBrzAjMN/M17DjAa4Je1rdB1v9kz+R97sfch+8OaRly/1pjk2H2FLb/5k/uwL&lt;/diagram&gt;&lt;/mxfile&gt;'
                >
                  <defs />
                  <g>
                    <path
                      d="M 1 2.6 Q 5 2.6 7 7.6 Q 9 12.6 11.56 12.6"
                      fill="none"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      pointer-events="stroke"
                    />
                    <path
                      d="M 14.76 12.6 L 11.56 14.2 L 11.56 11 Z"
                      fill="#ffffff"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      pointer-events="all"
                    />
                    <path
                      d="M 1 12.6 Q 5 12.6 7 7.6 Q 9 2.6 11.56 2.6"
                      fill="none"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      pointer-events="stroke"
                    />
                    <path
                      d="M 14.76 2.6 L 11.56 4.2 L 11.56 1 Z"
                      fill="#ffffff"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      pointer-events="all"
                    />
                  </g>
                </svg>{' '}
                {t('Shuffle')}
              </>
            ) : (
              // ' 🔀 ' + t('Shuffle')
              <>
                <div className={classes.icon}>■</div> {t('Stop')}
              </>
            )}
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
            <div className={classes.icon}>▶</div> {t('Insertion sort')}
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
          {t('n_elements_array', { count: countState })}
          <br />
          <nobr>{getCurrentAlgoTitle()}</nobr>
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
