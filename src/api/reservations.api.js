import config from '../config'
import axios from 'axios';
import { sendEmail } from '../api'
import * as Actions from '../store/actions'
/**
 * 
 * @param {*} newReservation 
 * newReservation contains
 * start: YYYY-MM-DD HH:mm:ss
 * end: YYYY-MM-DD HH:mm:ss
 * employee: The ID of the employee
 * service: ID of the service
 * customer: ID of the customer.
 * note: note about the reservation
 * price: price of the service
 */
export function addReservation(newReservation) {
    return (dispatch) => {
        const request = axios.post(`${config.serverUrl}/reservations`, newReservation, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return request.then((response) => {
            if (!response.Error)
                sendEmail(response.data.reservation.id)
        }
        )
    };
}

export function deleteReservation(reservationId, paymentIntent, stripeAccount) {

    return (dispatch) => {
        const request = axios.delete(`${config.serverUrl}/reservations`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                data: reservationId / 1337
            }

        });

        return request.then((response) => {
            if (paymentIntent !== {} && !response.Error)
                dispatch(refundReservation(paymentIntent, stripeAccount))

            /* if (!response.Error)
                 sendEmail(response.data.reservation.id)
         }*/
        })
    };
}

export function refundReservation(paymentIntent, stripeAccount) {
    return async function (dispatch) {
        return axios.get(`${config.serverUrl}/stripe/requestStripeRefund?paymentIntent=${paymentIntent}&stripeAccount=${stripeAccount}`).then((res) => {
            if (res.error) {
                console.log("ERROR requestStripeRefund")
            } else {
                console.log("requestStripeRefund " + JSON.stringify(res))
                //dispatch(Actions.setStripeCharges(res.data))
            }
        });
    }

    
}

export function getReservation(reservationId) {
    const URL = `${config.serverUrl}/reservations?reservationId=${(reservationId / 1337)}`;
    const request = axios.get(URL);

    return (dispatch) =>
        request.then((response) => {
            return dispatch(Actions.setReservation(response.data.Rows[0]));
            // dispatch(Actions.getEmployees(response.data.Rows))
        });

}