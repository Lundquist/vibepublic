import axios from 'axios';
import config from '../../../config'
import store from '../../../store'

//store.subscribe(companyId)

function companyId() {
    return 1;
    //return store.getState().global.company.information.id
}


export const GET_CUSTOMERS = '[CUSTOMERS] GET CUSTOMERS';
export const GET_CUSTOMER_RESERVATIONS = '[CUSTOMERS] GET CUSTOMERS RESERVATIONS';
export const UPDATE_TAGS = '[CUSTOMERS] UPDATE_TAGS';
export const SELECT_TAGS = '[CUSTOMERS] SELECT_TAGS';
export const SET_CUSTOMER = '[CUSTOMERS] SET_CUSTOMER';



export function getCustomers(data) {
    return {
        type: GET_CUSTOMERS,
        payload: data
    }
}

export function updateUserTags(customerId, tags) {
    let data = { data: JSON.stringify({ customerId: customerId, tags: tags }) }
    const request = axios.put(`${config.serverUrl}/setUserTags`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return (dispatch) => {
        request.then((response) => {
            dispatch({
                type: UPDATE_TAGS,
                payload: response.data,
                id: customerId
            })
        })
    }
}

export function selectTags(tags) {
    return (dispatch) => (
        dispatch({
            type: SELECT_TAGS,
            payload: tags
        })
    )
}


export function getCustomerReservations(userId, companyId) {
    const URL = `${config.serverUrl}/getReservationsForUser?userId=${userId}&companyId=${companyId}`;
    const request = axios.get(URL);

    return (dispatch) =>
        request.then((response) => {
            if (response) {
                dispatch({
                    type: GET_CUSTOMER_RESERVATIONS,
                    payload: response.data
                })
            }
        });
}

export function setCustomer(customer) {
    return {
        type: SET_CUSTOMER,
        payload: customer
    }
}


export function deleteCustomer(customerId, companyId) {
    const URL = `${config.serverUrl}/user`;
    const request = axios.delete(URL, {
        data: {
            customerId: customerId
        }
    });
    return (dispatch) =>
        request.then((response) => {
            dispatch(getCustomers(companyId))
        });
}