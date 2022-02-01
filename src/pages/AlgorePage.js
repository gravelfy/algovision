import { Component } from 'react';
import Chart from '../components/ui/Chart';

export default class AlgorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countState: '',
    };
  }
  changeValue(countState) {
    this.setState({ countState });
  }
  render() {
    return (
      <div>
        <Chart countState={this.state.countState} />
      </div>
    );
  }
}

// import React, { useContext } from 'react';
// import { ParamsContext } from '../logic/ParamsContext';

// export default function AlgoePage() {
//   const [params, setParams] = useContext(ParamsContext);
//   //const [context, setContext] = useContext(Context);
//   //const [user, setUser] = useContext(UserContext);

//   // dirty hack
//   const pdata = JSON.parse(JSON.stringify(params));
//   console.log('pdata', pdata);
//   console.log('pdata.count', pdata.count);

//   return (
//     <div>
//       <h2>AL GORE Page:</h2>
//       <pre>isPlaying: {pdata.isPlaying}</pre>
//       <pre>Looping: {pdata.looping}</pre>
//       <pre>Count: {pdata.count}</pre>
//       <pre>Ordre: {pdata.ordre}</pre>
//       <pre>Sort History: {pdata.sortHistory}</pre>
//       <pre>{JSON.stringify(params, null, 2)}</pre>

//       {/* {context} */}
//     </div>
//   );
// }
