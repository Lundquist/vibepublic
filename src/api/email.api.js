import * as Actions from '../store/actions'
import config from '../config'
import axios from 'axios';
import store from '../store'

function selectedCustomer() {
    return store.getState().global.customers.selectedCustomer
}
function selectedService() {
    return store.getState().global.services.selectedService
}
function selectedDate() {
    return store.getState().global.booking.selectedTime
}
function companyInformation() {
    return store.getState().global.company.information
}
export function sendEmail() {
    const URL = `${config.serverUrl}/email/confirmation`

    const request = axios.post(URL, {
        name: selectedCustomer().firstname,
        email: selectedCustomer().email,
        selectedTime: selectedDate(),
        service: selectedService().name,
        serviceTime: selectedService().time,
        address: companyInformation().address,
        price: selectedService().price
    });
    request.then((response) => {
    })

}