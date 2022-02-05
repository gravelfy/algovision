import { Component } from 'react';
import { createArray, shuffle } from '../../algos/shuffle';
import Bar from './Bar';
import classes from './Chart.module.css';

// const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

// console.log(ordre, sortHistory);
// useEffect(() => {
//   setOrdre(sortHistory[loopingVar]);
// }, [loopingVar, sortHistory]);

// useEffect(() => {
//   if (loopingVar < sortHistory.length - 1 && playing) {
//     clearTimeout(timeoutRef.current!);
//     timeoutRef.current = setTimeout(() => {
//       setLoopingVar(loopingVar + 1);
//     }, 50);
//   } else {
//     setPlaying(false);
//     //      setSortHistory(array);
//   }
// }, [loopingVar, playing, sortHistory.length]);

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countState: '',
      tableau: [],
      //    tableau: new Array()
    };
    //    this.state.tableau = new Array();
  }

  getTableau() {
    return this.state.tableau;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  componentDidMount() {
    // if (this.state.tableau.length !== this.props.countState)
    //   this.setState({ tableau: createArray(this.props.countState) });
    // this.setState({ tableau: shuffle(this.state.tableau) });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   let newName = 'Obaseki Nosa';
  //   // Don't forget to compare states
  //   if (prevState.countState !== this.state.countState) {
  //     // Write logic here.
  //     this.setState({ tableau: createArray(this.props.countState) });
  //     this.setState({ tableau: shuffle(this.state.tableau) });
  //   }
  //   if (prevState && prevState.tableau.length !== prevProps.countState) {
  //   }
  // }

  render() {
    // console.log('tableau.length', this.state.tableau.length);
    // console.log('tableau', this.state.tableau);
    // console.log('tableau', this.state.tableau);
    // console.log('Tableau()', this.getTableau());

    this.state.tableau = createArray(this.props.countState);
    this.state.tableau = shuffle(this.state.tableau);

    return (
      <>
        <div className={classes.chart}>
          {Object.values(this.state.tableau).map((barre) => (
            <Bar barre={barre} cpc={this.state.tableau.length}>
              {' '}
              {barre}
            </Bar>
          ))}
        </div>
      </>
    );
  }
}
