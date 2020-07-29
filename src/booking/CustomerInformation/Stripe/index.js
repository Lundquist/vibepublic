import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../../store/withReducer';
import reducer from '../../../store/reducers';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// Call `loadStripe` with the same connected account ID used when creating
// the PaymentIntent.

const Stripe = () => {
    const { information } = useSelector(({ global }) => global.company);

    const stripePromise = loadStripe("pk_test_wguKhnBNi9r1x4gDqXkgITv200M57KPGJm",
    {stripeAccount: "{{CONNECTED_STRIPE_ACCOUNT_ID}}"});
  

//      <CheckoutForm />

  return (
    <Elements stripe={stripePromise}>
    </Elements>
  );
};
export default withReducer('calendarApp', reducer)(Stripe);