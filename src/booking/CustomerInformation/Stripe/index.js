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

    const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY,
    {stripeAccount:information.stripeAccount});
  

//      

  return (
    <Elements stripe={stripePromise}>
        <CheckoutForm createCustomer={(data) => props.createCustomer(data)}/>
    </Elements>
  );
};
export default withReducer('calendarApp', reducer)(Stripe);