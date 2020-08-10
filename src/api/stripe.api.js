
import * as Actions from '../store/actions';
import axios from 'axios';
import config from '../config'
import store from '../store'

//store.subscribe(companyId)

function companyId() {
    //return 2381;
    return store.getState().global.company.information.id
}
export const signUpToStripeConnect = (url) => {
    console.log("Booking/signupToStripeConnect")
    return async function (dispatch) {
        return axios.get(`${config.serverUrl}/stripe/connectStripeAccount?code=${url}`).then((res) => {
            if (res.error) {
                console.log("ERROR signUpToStripeConnect")
            } else {
                console.log("Booking/signupToStripeConnect2222 ")

                //  dispatch(Actions.setPrices(res.data.data))
            }
        });
    }
}

export const startPaymentIntent = async (service, account) => {
    console.log("startPaymentIntent 1")
    return axios.post(`${config.serverUrl}/stripe/paymentIntent`, {
        currency: 'EUR',
        account: account,
        service: service

    }).then((response) =>{
        return response
        console.log("startPaymentIntent" + JSON.stringify(response))
    })

    const response = await fetch('/secret');
    const {client_secret: clientSecret} = await response.json();
  
}




export const stripePaymentMethodHandler = (result, email) => {
    if (result.error) {
        // Show error in payment form3
        console.log("stripePaymentMethodHandler ERROR!!!!" + JSON.stringify(result))

    } else {
        // Otherwise send paymentMethod.id to your server
        axios.post(`${config.serverUrl}/stripe/customer`, {
            customer: companyId(),
            payment_method: result.paymentMethod.id,
        }).then(function (company) {
            // The customer has been created
            axios.put(`${config.serverUrl}/company`, {
                companyid: companyId(),
                expires: company.data.current_period_end
            }).then((response) => {
                console.log("stripePaymentMethodHandler3")
                Actions.updateCompanyExpires(company.data.current_period_end)

            })
        });

    }
}

export const getStripeProducts = () => {
    axios.get(`${config.serverUrl}/stripe/plans`).then(function (products) {
        console.log("getStripeProducts " + JSON.stringify(products))
    })


}

