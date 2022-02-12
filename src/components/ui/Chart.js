import { Component } from 'react';
import { createArray, shuffle } from '../../algos/shuffle';
import Bar from './Bar';
import classes from './Chart.module.css';

// ! from algotri
// TODO refactor vars

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count,
      ordre: [],
      animIdx: this.props.animIdx,
      pointer: this.props.pointer,
      isPlaying: this.props.isPlaying,
      animFrames: this.props.animFrames,
      tableau: [],
      msg: '',
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
    if (props.animIdx !== state.animIdx) {
      return {
        animIdx: props.animIdx,
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
      this.setState({ tableau: shuffle(createArray(this.props.count)) });
    }
    if (prevState.animIdx !== this.state.animIdx && this.state.animIdx !== 0) {
      this.setState({ ordre: this.state.animFrames[this.state.animIdx] });
      this.setState({ tableau: this.state.animFrames[this.state.animIdx] });
    }
  }

  render() {
    return (
      <>
        <div className={classes.chart}>
          {Object.values(this.state.tableau).map((barre, i) => (
            <Bar
              barre={barre}
              cpc={this.state.tableau.length}
              animIdx={this.state.animIdx}
              pointer={this.state.pointer}
              key={i}
              i={i}
            >
              {' '}
              {barre}
            </Bar>
          ))}
        </div>
      </>
    );
  }
}
