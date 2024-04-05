import React from 'react';
import MainRouter from './routes/MainRouter';

export const URL = process.env.REACT_APP_SERVER_URL;
export const ApiRoute = process.env.REACT_APP_API_ROUTE;
export const stripeKey = process.env.REACT_APP_STRIPE_PUBLISH_KEY;

function App() {

  return (
    <MainRouter/>
  )
}

export default App;
