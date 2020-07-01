import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import './App.css';
import Booking from './booking'
import reducer from './store/reducers'
import { createStore } from 'redux';
//const store = createStore(reducer);

const App = (props) => {
  console.log("appyMcApp " + JSON.stringify(store))
  return (
    <Provider store={store}>
      <Booking />
    </Provider>
  );
}

export default App;
