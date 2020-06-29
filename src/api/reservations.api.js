import config from '../config'
import axios from 'axios';
import * as Actions from 'app/store/actions';

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
    console.log("addReservation " + config.serverUrl)
    return (dispatch) => {
        const request = axios.post(`${config.serverUrl}/reservations`, newReservation, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return request.then((response) =>
            console.log("addReservation " + JSON.stringify(response))

        )
    };
}