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

  componentDidMount() {
    if (this.state.count > 0) {
      this.setState({ tableau: shuffle(createArray(this.props.count)) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
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
        <div className={classes.chart}>
          {Object.values(this.state.tableau).map((barre, i) => (
            <Bar barre={barre} cpc={this.state.tableau.length} key={i}>
              {' '}
              {barre}
            </Bar>
          ))}
        </div>
      </>
    );
  }
}
