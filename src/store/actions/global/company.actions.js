import axios from 'axios';
import config from '../../../config'
import * as api from '../../../api'
import * as Actions from '../../../store/actions'
import store from '../../../store'
import i18n from 'i18n';

export const SET_COMPANY_SETTINGS = '[GLOBAL] GET_COMPANY_SETTINGS';
export const SET_COMPANY_INFORMATION = '[GLOBAL] SET_COMPANY_INFORMATION';
export const SET_SERVICES = '[GLOBAL] GET_SERVICES';
export const SET_RESERVATIONS = '[GLOBAL] GET_RESERVATIONS';
export const SET_COMPANY = '[GLOBAL] SET_COMPANY_INFORMATION';
export const UPDATE_COMPANY_SETTINGS = '[GLOBAL] UPDATE_COMPANY_SETTINGS';
export const PUT_COMPANY_SETTINGS = '[GLOBAL] PUT_COMPANY_SETTINGS';
export const SET_COMPANY_EXPIRES = '[GLOBAL] SET_COMPANY_EXPIRES';
export const SET_OPENING_HOURS = '[GLOBAL] SET_OPENING_HOURS';
export const ADD_RESERVATION = '[GLOBAL] ADD_RESERVATION';
export const INITIALIZE_COMPANY = '[GLOBAL] INITIALIZE_COMPANY';

store.subscribe(companyId)
//const server = config.serverUrl

function companyId() {
    return store.getState().global.company.information.id
}

export function createNewCompany(email) {
    const URL = `${config.serverUrl}/employee`;
    const request = axios.post(URL, email, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    request.then((employeeResponse) => {
        if (!employeeResponse.data.Error) {
            const URL = `${config.serverUrl}/company`;
            const request = axios.post(URL, employeeResponse, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            request.then((companyResponse) => {
                if (!companyResponse.data.Error) {
                    const URL = `${config.serverUrl}/employeecompany`;
                    const request = axios.post(URL, {
                        employeeId: employeeResponse.data.Rows.insertId,
                        companyId: companyResponse.data.Rows.insertId
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    request.then((response) => {
                        setCurrentCompany(companyResponse.data.Rows.insertId)
                    })
                }
            });
        }
    });
}

export function setCurrentCompany(companyId) {
    const URL = `${config.serverUrl}/company?companyId=${companyId}`;
    const request = axios.get(URL, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return (dispatch) => {
        request.then((response) => {
            if (!response.data.Error) {

                dispatch({
                    type: SET_COMPANY,
                    payload: response.data.Rows[0]
                })
                dispatch(getCompanySettings(companyId))
                dispatch(api.getEmployees())
                dispatch(api.getServices())
                dispatch(api.getCategories())
                dispatch(api.getCustomers())
                dispatch(api.getOpeningHours())
                dispatch(getCompanyReservations(companyId))

            }
        }).then(() => dispatch(initializeCompany())
        ).catch(e => console.log("setCurrentCompany ERROR: " + e));
    }
}

export function initializeCompany() {
    return (dispatch) =>
        dispatch({
            type: INITIALIZE_COMPANY
        })
}

export function getCompanySettings(companyId) {
    const URL = `${config.serverUrl}/companySettings?companyId=${companyId}`;
    const request = axios.get(URL);
    return (dispatch) =>
        request.then((response) => {
            // i18n.changeLanguage(response.data.Rows.companyLanguage)
            dispatch({
                type: SET_COMPANY_SETTINGS,
                payload: response.data.Rows
            })
        });
}

export function getCompanyEmployees(companyId) {
    const request = axios.get(`${config.serverUrl}/employeecompany?companyId=${companyId}`);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: Actions.SET_EMPLOYEES,
                payload: response.data.Rows
            })
        });
}

export function setCompanySettings(settings){
    i18n.changeLanguage(settings.companyLanguage);

    return (dispatch) =>
    dispatch({
        type: SET_COMPANY_SETTINGS,
        payload: settings
    })
}
/*
export function getCompanyServices(companyId) {
    const request = axios.get(`${config.serverUrl}/service?companyId=${companyId}`);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: SET_SERVICES,
                payload: response.data.Rows
            })
        });
}
*/
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
export function getCompanyReservations() {
    let token = localStorage.getItem('access_token')
    const request = axios.get(`${config.serverUrl}/reservations?companyId=${companyId()}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: SET_RESERVATIONS,
                payload: response.data
            })
        });
}
export function setStateChange(value) {
    return (dispatch) =>
        dispatch({
            type: UPDATE_COMPANY_SETTINGS,
            payload: value
        })
}

export function setOpeningHours(value) {
    return (dispatch) =>
        dispatch({
            type: SET_OPENING_HOURS,
            payload: value
        })
}

export function putCompanySettings(companyId = 1, companySettings) {
    const URL = `${config.serverUrl}/companySettings?companyId=${companyId}`;
    const request = axios.put(URL, {
        data: companySettings
    });
    return (dispatch) =>
        request.then((response) => {
            /*
            dispatch({
                type: PUT_COMPANY_SETTINGS,
                payload: response.data
            })
            */
        });
}

export function updateCompany(payload) {
    return (dispatch) =>
        dispatch({
            type: SET_COMPANY,
            payload: payload
        })

}

export function addReservation(data) {
    return (dispatch) =>
        dispatch({
            type: ADD_RESERVATION,
            payload: data
        })

}

export function updateCompanyExpires(expires) {
    return (dispatch) => {
        dispatch({
            type: SET_COMPANY_EXPIRES,
            payload: expires
        })
    }
}
