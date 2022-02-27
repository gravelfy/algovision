import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import './i18n/i18n.js';
import { AlgoParameters } from './logic/AlgoParams';
import { ParamsContext } from './logic/ParamsContext';
import AlgoPage from './pages/AlgoPage';

function App() {
  const [params, setParams] = useState(AlgoParameters());

  return (
    <Layout>
      <ParamsContext.Provider value={[params, setParams]}>
        <Switch>
          <Route path="/algo-react" exact>
            <AlgoPage />
          </Route>
        </Switch>
      </ParamsContext.Provider>
    </Layout>
  );
}

export default App;
