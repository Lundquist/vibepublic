import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import './CardSection.scss'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection(props) {
  return (
    <label>
      Card details
      <CardElement options={CARD_ELEMENT_OPTIONS} onChange={(e) => props.resetInfo()}/>
    </label>
  );
};

export default CardSection;