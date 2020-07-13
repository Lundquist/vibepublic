import * as Actions from '../store/actions'
import config from '../config'
import axios from 'axios';
import store from '../store'

function selectedCustomer() {
    //return 2381;
    //console.log("selectedCustomer " + JSON.stringify(store.getState().global))
    return store.getState().global.customers.selectedCustomer
}

export function sendEmail() {
    const URL = `${config.serverUrl}/email/confirmation`
    console.log("TestMail " + selectedCustomer().firstname)
    console.log("TestMail " + selectedCustomer().email)

    const request = axios.post(URL, {
        name: selectedCustomer().firstname,
        email: selectedCustomer().email
    });
    request.then((response) => {
    })

}