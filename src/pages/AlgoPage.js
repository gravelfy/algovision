import { useContext, useState } from 'react';
import { triageABulles, triageInsertion } from '../algos/tri';
import Card from '../components/ui/Card';
import Chart from '../components/ui/Chart';
import { ParamsContext } from '../logic/ParamsContext';
import classes from './AlgoPage.module.css';

export default function AlgoPage() {
  // const { isPlaying, count, looping, ordre, sortHistory } =
  //   useContext(AnimContext);

  const [params, setParams] = useContext(ParamsContext);

  console.log(params);
  console.log(JSON.stringify(params));

  // dirty hack
  const pdata = JSON.parse(JSON.stringify(params));

  console.log(pdata);

  const [isPlayingState, setIsPlayingState] = useState(pdata.isPlaying);
  const [countState, setCountState] = useState(pdata.count);
  const [loopingState, setLoopingState] = useState(pdata.looping);
  const [ordreState, setOrdreState] = useState(pdata.ordre);
  const [sortHistoryState, setSortHistoryState] = useState(pdata.sortHistory);

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
              triageABulles();
            }}
          >
            Tri à bulles
          </button>

          <button
            className={classes.boutons}
            onClick={() => {
              triageInsertion();
            }}
          >
            Tri par insertion
          </button>
        </div>
        {/* <div>params.count: {params.count}</div>
        <div>countState: {countState}</div> */}
        {<Chart countState={countState} />}
      </Card>
    </section>
  );
}
