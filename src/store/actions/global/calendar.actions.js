import axios from 'axios';
import config from '../../../config';

export const GET_EVENTS = '[CALENDAR APP] GET EVENTS';
export const OPEN_NEW_EVENT_DIALOG = '[CALENDAR APP] OPEN NEW EVENT DIALOG';
export const CLOSE_NEW_EVENT_DIALOG = '[CALENDAR APP] CLOSE NEW EVENT DIALOG';
export const OPEN_EDIT_EVENT_DIALOG = '[CALENDAR APP] OPEN EDIT EVENT DIALOG';
export const CLOSE_EDIT_EVENT_DIALOG = '[CALENDAR APP] CLOSE EDIT EVENT DIALOG';
export const ADD_EVENT = '[CALENDAR APP] ADD EVENT';
export const UPDATE_EVENT = '[CALENDAR APP] UPDATE EVENT';
export const REMOVE_EVENT = '[CALENDAR APP] REMOVE EVENT';
export const SEARCH = '[CALENDAR APP] SEARCH';

const server = config.serverUrl

export function openNewEventDialog(data) {
    return {
        type: OPEN_NEW_EVENT_DIALOG,
        data
    }
}

export function closeNewEventDialog() {
    return {
        type: CLOSE_NEW_EVENT_DIALOG
    }
}

export function openEditEventDialog(data) {
    return {
        type: OPEN_EDIT_EVENT_DIALOG,
        data
    }
}

export function closeEditEventDialog() {
    return {
        type: CLOSE_EDIT_EVENT_DIALOG
    }
}


/**
 * Returns all reservations as an Array.
 * Each individual reservation is in the format:
 * id int 
 * start:YYYY-MM-DD HH:mm:ss
 * end:YYYY-MM-DD HH:mm:ss
 * employee: employeeId
 * service: JSON string with serviceId, name, price, time.
 * customer: JSON string with name and phone
 */
export function getEvents() {
    let token = localStorage.getItem('access_token')
    const request = axios.get(`${server}/api/reservations?companyId=1`,  {headers: { 'Authorization': `Bearer ${token}` }});
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_EVENTS,
                payload: response.data
            })
        });
}

/**
 * 
 * @param {*} newReservation 
 * newReservation is a JSON string with
 * start: YYYY-MM-DD HH:mm:ss
 * end: YYYY-MM-DD HH:mm:ss
 * employee: The ID of the employee
 * service: JSON string with serviceId, name, price, time (how long it takes to perform the service).
 * customer: JSON string with name and phone.
 */
export function addEvent(newReservation) {
    return (dispatch, getState) => {
        const request = axios.post(`${server}/reservations`, newReservation, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_EVENT
                })
            ]).then(() => dispatch(getEvents()))
        );
    };
}


/**
 * 
 * @param {*} reservation 
 * @param {*} accessToken 
 * reservation is a JSON string with
 * id: id of the reservation to update
 * start: YYYY-MM-DD HH:mm:ss
 * end: YYYY-MM-DD HH:mm:ss
 * employee: The ID of the employee
 * service: JSON string with serviceId, name, price, time (how long it takes to perform the service).
 * customer: JSON string with name and phone.
 * 
 * Requires accessToken from store
 */
export function updateEvent(reservation, accessToken) {
    return (dispatch, getState) => {
        const request = axios.put(`${server}/reservations`, reservation,{
            headers: {
                'Content-Type': 'application/json',
      //          'token': accessToken
            }
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_EVENT
                })
            ]).then(() => dispatch(getEvents()))
        );
    };
}
/**
 * 
 * @param {*} eventId 
 * @param {*} accessToken 
 * 
 * Removes the reservation with the specified ID
 */
export function removeEvent(eventId, accessToken) {
    return (dispatch, getState) => {    
        const request = axios.delete(`${server}/reservations`, {
            headers: {
            'Content-Type': 'application/json',
           // 'token': accessToken
            },
            params: {
                data: eventId
            }
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_EVENT
                })
            ]).then(() => dispatch(getEvents()))
        );
    };
}
