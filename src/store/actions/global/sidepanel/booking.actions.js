import axios from 'axios';
import config from '../../../../config'
import { getCompanyReservations, getEvents, addReservation } from '../../../actions';

import { ADD_RESERVATION } from '../company.actions';
export const RESET_BOOKING_PANEL = '[BOOKING]  RESET_BOOKING_PANEL';
export const BOOKING_PANEL = '[BOOKING]  BOOKING_PANEL';
export const BOOKING_CUSTOMER = '[BOOKING]  BOOKING_CUSTOMER';
export const BOOKING_EMPLOYEE = '[BOOKING]  BOOKING_EMPLOYEE';
export const BOOKING_SERVICE = '[BOOKING]  BOOKING_SERVICE';
export const BOOKING_EMPLOYEE_SERVICES = '[BOOKING] BOOKING_EMPLOYEE_SERVICES';
export const BOOKING_INTERNAL_NOTE = '[BOOKING] BOOKING_INTERNAL_NOTE';
export const BOOKING_SUBMIT = '[BOOKING] BOOKING_SUBMIT';
export const BOOKING_TIME = '[BOOKING] BOOKING_TIME';

export function setBookingPanel(data) {
    return (dispatch) => {
        if (data.type !== "new") {
            let employee = {
                id: data.employeeId,
                firstname: data.firstname,
                lastname: data.lastname
            }
            dispatch({
                type: BOOKING_PANEL,
                payload: data
            })

            let customer = {
                value: data.customerId,
                label: data.customerFirstName + " " + data.customerLastName + " " + data.phone,
                userId: data.customerId,
                firstname: data.customerFirstName,
                lastname: data.customerLastName,
                email: data.email,
                phone: data.phone
            }

            let service = {
                id: data.serviceId,
                name: data.serviceName,
                price: data.servicePrice,
                time: data.time
            }

            dispatch(setBookingService(service))
            dispatch(setBookingCustomer(customer))
            dispatch(setBookingEmployee(employee))
        } else if (data.type === 'new' && data.start != null) {
            dispatch({
                type: BOOKING_PANEL,
                payload: {
                    id: 0,
                    start: data.start,
                    end: null,
                    note: null
                }
            })
        } else {
            dispatch(resetBookingPanel())
        }

    }
}

export function setBookingTime(time) {
    return (dispatch) => {
        dispatch({
            type: BOOKING_TIME,
            payload: time
        })
    }
}

export function resetBookingPanel() {
    return {
        type: RESET_BOOKING_PANEL
    }
}


export function setBookingCustomer(data) {
    return {
        type: BOOKING_CUSTOMER,
        payload: data
    }
}

export function setBookingEmployee(data) {
    return {
        type: BOOKING_EMPLOYEE,
        payload: data
    }
}

export function setInternalNote(data) {
    return {
        type: BOOKING_INTERNAL_NOTE,
        payload: data
    }
}

export function setBookingService(data) {
    return (dispatch) => {
        dispatch({
            type: BOOKING_SERVICE,
            payload: data
        })
        dispatch(getEmployeesForService(data.id))
    }
}


export function getEmployeesForService(serviceId) {
    const request = axios.get(`${config.serverUrl}/getEmployeesForService?serviceId=${serviceId}`);
    return (dispatch) => {
        request.then((response) => {
            dispatch({
                type: BOOKING_EMPLOYEE_SERVICES,
                payload: response.data.Rows
            })
        });
    }
}


export function updateReservation(newReservation) {
    const request = axios.put(`${config.serverUrl}/reservations`, newReservation, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return (dispatch) => {
        request.then((response) => {
            dispatch({
                type: RESET_BOOKING_PANEL
            })
            dispatch(getEvents)
        });
    }
}