import { useMemo, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import { AnimContext } from './logic/animation';
import { ParamsContext } from './logic/ParamsContext';
import AlgoPage from './pages/AlgoPage';
import AlgorePage from './pages/AlgorePage';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';

function App() {
  // bnawad
  const [params, setParams] = useState(null);

  const value = useMemo(() => ({ params, setParams }), [params, setParams]);

  // const AnimContext = createContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(30);
  const [looping, setLooping] = useState(0);
  const [ordre, setOrdre] = useState(0);
  const [sortHistory, setSortHistory] = useState(0);

  const MyProvider = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [count, setCount] = useState(30);
    const [looping, setLooping] = useState(0);
    const [ordre, setOrdre] = useState(0);
    const [sortHistory, setSortHistory] = useState(0);

    return (
      <AnimContext.Provider
        value={{
          isPlaying: [isPlaying, setIsPlaying],
          count: [count, setCount],
          looping: [looping, setLooping],
          ordre: [ordre, setOrdre],
          sortHistory: [sortHistory, setSortHistory],
        }}
      >
        {props.chidren}
      </AnimContext.Provider>
    );
  };

  // const [context, setContext] = useState(contextObj);
  const [context, setContext] = useState('default context value');
  return (
    <div>
      <Layout>
        <ParamsContext.Provider value={[params, setParams]}>
          <Switch>
            <Route path="/" exact>
              {/* <Context.Provider value={[context, setContext]}> */}
              <HomePage />
            </Route>
            <Route path="/comparaison">
              <AlgoPage />

              {/* <AlgoPage /> */}
            </Route>
            <Route path="/commentaires">
              <AlgorePage countState="30" />

              {/* <AlgoPage /> */}
            </Route>
            <Route path="/favoris">
              <TestPage />
              {/* <AlgoPage /> */}
            </Route>
            <Route path="/apropos">{/* <AlgoPage /> */}</Route>
          </Switch>
        </ParamsContext.Provider>
      </Layout>
    </div>
  );
}

export default App;
