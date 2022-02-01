import React, { useContext } from 'react';
import { AlgoParams } from '../logic/AlgoParams';
import { ParamsContext } from '../logic/ParamsContext';

export default function HomePage() {
  const [params, setParams] = useContext(ParamsContext);
  //const [context, setContext] = useContext(Context);
  //const [user, setUser] = useContext(UserContext);

  return (
    <div>
      <h2>Home Page:</h2>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <button
        onClick={async () => {
          const params = await AlgoParams();
          setParams(params);
        }}
      >
        Load Algo Params
      </button>
      {/* {context} */}
    </div>
  );
}
