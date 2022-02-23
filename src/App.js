import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import { AlgoParameters } from './logic/AlgoParams';
import { ParamsContext } from './logic/ParamsContext';
import AlgoPage from './pages/AlgoPage';

function App() {
  const [params, setParams] = useState(AlgoParameters());

  return (
    <div>
      <Layout>
        <ParamsContext.Provider value={[params, setParams]}>
          <Switch>
            <Route path="/algo-react" exact>
              {/* <Context.Provider value={[context, setContext]}> */}
              <AlgoPage />
            </Route>
          </Switch>
        </ParamsContext.Provider>
      </Layout>
    </div>
  );
}

export default App;
