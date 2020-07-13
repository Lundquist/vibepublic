import config from '../config'
import axios from 'axios';
import { sendEmail } from '../api'
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
                sendEmail()
        }
        )
    };
}