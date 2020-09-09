import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../store/withReducer';
import reducer from '../../../store/reducers';
import config from '../../../config'
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// Call `loadStripe` with the same connected account ID used when creating
// the PaymentIntent.

const Stripe = (props) => {
    const { information } = useSelector(({ global }) => global.company);


//      

  return (
    <div>Stripe</div>
  );
};
export default withReducer('calendarApp', reducer)(Stripe);