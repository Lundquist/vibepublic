import React from 'react';
import '../styles/customerInformation.scss';
import * as Actions from '../store/actions';
import { Button } from '@material-ui/core';
import config from '../../config'
function Stripe(props) {
    const stripe = window.Stripe(config.STRIPE_PUBLISHABLE_KEY);

    async function handleStripe(e) {
        const session = await Actions.payWithStripe({ customer: "Robert", price: 1337 }).then(response => {
            console.log("1111 " + session)
            const { error } = stripe.redirectToCheckout({
                // Make the id field from the Checkout Session creation API response
                // available to this file, so you can provide it as parameter here
                // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                sessionId: response.result.id
            }).then(response2 => {
                console.log("magass " + session)
            })
            console.log(error.message)
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `error.message`.

        })
    }

    return (
        <div className="stripeContainer">
            <form  onSubmit={(e) => e.preventDefault()}>
                <button type="submit" onClick={(e) => handleStripe()}>
                    Pay with Stripe
                    </button>
            </form>
        </div>
    )

}

// 
export default Stripe;
