import React from 'react';
import store from './store';
import Provider from 'react-redux/es/components/Provider';
import './App.css';
import Booking from './booking'

const App = (props) => {
  console.log("appyMcApp " + JSON.stringify(store))
  return (
      <Provider store={store}>
        <Booking />
      </Provider>
  );
}

export default App;
