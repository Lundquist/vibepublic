import React from 'react';
import '../styles/customerInformation.scss';
import * as Actions from '../store/actions';
import { Button } from '@material-ui/core';
import config from '../../config'
function Stripe(props) {

    async function handleStripe(e) {
        
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
