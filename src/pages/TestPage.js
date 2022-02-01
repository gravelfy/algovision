import React, { useContext } from 'react';
import { ParamsContext } from '../logic/ParamsContext';

export default function HomePage() {
  const [params, setParams] = useContext(ParamsContext);
  //const [context, setContext] = useContext(Context);
  //const [user, setUser] = useContext(UserContext);

  return (
    <div>
      <h2>Test Page:</h2>
      <pre>{JSON.stringify(params, null, 2)}</pre>

      {/* {context} */}
    </div>
  );
}
