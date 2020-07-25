import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import './App.css';
import Booking from './booking'
import reducer from './store/reducers'
import { createStore } from 'redux';
import {Helmet} from "react-helmet";
import { useSelector } from 'react-redux';

 
//const store = createStore(reducer);

const App = (props) => {
  const { information } = useSelector(({ global }) => global.company);

  return (
    <Provider store={store}>
          <Helmet>
            <title>{information.name}</title>
            </Helmet>
      <Booking />
    </Provider>
  );
}

export default App;
