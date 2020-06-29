import axios from 'axios';
import config from '../../../config'

export const GET_COMPANY = '[BOOKING APP] GET_COMPANY';
export const GET_SERVICES = '[BOOKING APP] GET_SERVICES';
export const GET_CATEGORIES = '[BOOKING APP] GET_CATEGORIES';
export const GET_EMPLOYEES = '[BOOKING APP] GET_EMPLOYEES';
export const GET_AVAILABLE_HOURS = '[BOOKING APP] GET_AVAILABLE_HOURS';
export const ADD_BOOKING = '[BOOKING APP] ADD_BOOKING';
export const PAY_STRIPE = '[BOOKING APP] PAY_STRIPE';

export function getCompany(companyId) {
    const request = axios.get(`${config.serverUrl}/company?companyId=${companyId}`);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_COMPANY,
                payload: response.data.Rows
            })
        });
}



export function getServices(companyId) {
    const request = axios.get(`${config.serverUrl}/services?id=${companyId}`);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_SERVICES,
                payload: response.data.Rows
            })
        });
}

export function getCategories(companyId) {
    const request = axios.get(`${config.serverUrl}/category?id=${companyId}`);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_CATEGORIES,
                payload: response.data.Rows
            })
        });
}

export function getEmployees(serviceId) {
    const request = axios.get(`${config.serverUrl}/getEmployeesForService?id=${serviceId}`);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_EMPLOYEES,
                payload: response.data.Rows
            })
        });
}

export function getAvailableHours(selectedDate, employeeId, serviceTime) {
    const request = axios.get(`${config.serverUrl}/availableHours?employeeId=${employeeId}&selectedDay=${selectedDate}&serviceTime=${serviceTime}`);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_AVAILABLE_HOURS,
                payload: response.data
            })
        });
}

export function addReservation(newReservation) {
    const request = axios.post(`${config.serverUrl}/reservations`, JSON.stringify(newReservation), {
        headers: {
            'Content-Type': 'application/json',
        }
    })


    return request.then((response) => {
        if (response.data.Error) {
            console.log("ERRROR")
            return false
        } else {
            console.log("GOODIE")
            return true
        }



    });
}
export function payWithStripe(stripeInfo) {
    const request = axios.post(`${config.serverUrl}/payStripe`, stripeInfo, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return request.then((response) => {

        if (response.data.Error) {
            console.log("payWithStripe ERROR! " + response.data.error)
            return false
        } else {
            return response.data
        }



    });
}


