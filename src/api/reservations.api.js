import config from '../config'
import axios from 'axios';
import { sendEmail, sendEmailReminder, sendMailOnReservationDelete } from '../api'
import store from '../store'
import moment from 'moment'
import * as Actions from '../store/actions'
import { resetBookingPanel, setSelectedService, setSelectedEmployee } from '../store/actions';

function companyId() {
    return store.getState().global.company.information.id
}

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
        const request = axios.post(`${config.serverUrl}/reservations`, { newReservation, companyId: companyId() }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return request.then((response) => {
            if (!response.Error){
                sendEmail(response.data.reservation.id, newReservation.reminderTime)
                if(!moment().isBetween(moment(newReservation.start), moment(newReservation.reminderTime)))
                    sendEmailReminder(response.data.reservation.id, newReservation.reminderTime)
                dispatch(Actions.setBookingComplete(true))
            }
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
            if (paymentIntent !== {} && !response.Error){
                dispatch(refundReservation(paymentIntent, stripeAccount))
                sendMailOnReservationDelete(response.data.reservation.id)
            }
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