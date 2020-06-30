import axios from 'axios';
import config from '../config'
import store from '../store'
import * as Actions from '../store/actions'
store.subscribe(companyId)

function companyId() {
    return store.getState().global.company.information.id
}

export function createCustomer(customer) {
    const URL = `${config.serverUrl}/user`;
    const request = axios.post(URL, {
        customer: customer,
        company: companyId()
    });
    return (dispatch) =>
        request.then((response) => {
            if(!response.data.Error){
                customer.userId = response.data.userId
                customer.pinCode = response.data.pinCode
                dispatch(Actions.setCustomer(customer))
            }
        });
}

export function saveCustomer(customer) {
    const URL = `${config.serverUrl}/user`;
    const request = axios.put(URL, {
        customer: customer
    });
    return (dispatch) =>
        request.then((response) => {
            console.log("customers.api saveCustomer " + JSON.stringify(response))
            dispatch(Actions.setCustomer(customer))
        });
}

export function getCustomers() {
    const URL = `${config.serverUrl}/getUsersForCompany?companyId=${companyId()}`;
    const request = axios.get(URL);

    return (dispatch) =>
        request.then((response) => {
            dispatch(Actions.getCustomers(response.data.Rows))
        })
    }

