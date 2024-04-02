import React from 'react';
import MainRouter from './routes/MainRouter';

export const URL = process.env.REACT_APP_SERVER_URL;
export const ApiRoute = process.env.REACT_APP_API_ROUTE;

function App() {

  return (
    <MainRouter/>
  )
}

export default App;
