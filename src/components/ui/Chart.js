import { Component } from 'react';
import { createArray, shuffle } from '../../algos/shuffle';
import Bar from './Bar';
import classes from './Chart.module.css';

const eGood = '';

// ! from algotri
// TODO refactor vars

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count,
      ordre: [],
      loopingIdx: this.props.loopingIdx,
      isPlaying: this.props.isPlaying,
      sortHistory: this.props.sortHistory,
      tableau: [],
      msg: 'Message',
    };
  }

  getTableau() {
    // console.log('GET TABLEAU');
    return this.state.tableau;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps countSt', this.state.count);
    // this.setState({ count: nextProps.count });
    // //this.setState({ isPlaying: nextProps.isPlaying });
    // this.setState({ loopingIdx: nextProps.loopingIdx });
    // console.log('componentWillReceiveProps loopingIdx', this.state.loopingIdx);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.count !== state.count) {
      return {
        count: props.count,
      };
    }
    if (props.isPlaying !== state.isPlaying) {
      return {
        isPlaying: props.isPlaying,
      };
    }
    if (props.loopingIdx !== state.loopingIdx) {
      return {
        loopingIdx: props.loopingIdx,
      };
    }
    return null;
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    // Don't forget to compare states
    if (prevState.count !== this.state.count) {
      // Write logic here.
      this.setState({ msg: 'reshuffle' });

      this.setState({ tableau: shuffle(createArray(this.props.count)) });
    }
    if (
      prevState.loopingIdx !== this.state.loopingIdx &&
      this.state.loopingIdx !== 0
    ) {
      this.setState({ msg: 'Animation' });
      this.setState({ ordre: this.state.sortHistory[this.state.loopingIdx] });
      this.setState({ tableau: this.state.sortHistory[this.state.loopingIdx] });
    }
    if (prevState.tableau.length !== this.state.tableau.length) {
      this.setState({ ordre: this.state.tableau });
    }
  }

  render() {
    return (
      <>
        <div>
          count: {this.state.count} &nbsp; | {this.state.msg}
        </div>
        <div className={classes.chart}>
          {Object.values(this.state.tableau).map((barre, i) => (
            <Bar barre={barre} cpc={this.state.tableau.length} key={i}>
              {' '}
              {barre}
            </Bar>
          ))}
        </div>
        <div border={this.state.isPlaying ? 1 : 0}>
          loopingIdx: {this.state.loopingIdx} &nbsp; | isPlaying:{' '}
          {this.state.isPlaying} &nbsp; | Tableau.length{' '}
          {this.state.tableau.length}
        </div>
        <div>ordre: {this.state.ordre}</div>
        <div>sortHistory: {this.state.sortHistory}</div>
      </>
    );
  }
}
