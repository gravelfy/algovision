import { Component } from 'react';
import { createArray, shuffle } from '../../algos/shuffle';
import Bar from './Bar';
import classes from './Chart.module.css';

var tableau = new Array();

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = { countState: '' };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  render() {
    if (tableau.length !== this.props.countState)
      tableau = createArray(this.props.countState);
    console.log('tableau.length', tableau.length);
    console.log('tableau', tableau);
    tableau = shuffle(tableau);
    console.log('tableau', tableau);
    return (
      <>
        <div className={classes.chart}>
          {Object.values(tableau).map((barre) => (
            <Bar barre={barre} cpc={tableau.length}>
              {' '}
              {barre}
            </Bar>
          ))}
        </div>
      </>
    );
  }
}
