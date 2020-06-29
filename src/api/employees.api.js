import config from '../config'
import axios from 'axios';
import store from 'app/store'

import * as Actions from 'app/store/actions';

store.subscribe(companyId)
const server = config.serverUrl

function companyId() {
    return store.getState().global.company.information.id
}
export function getEmployees() {
    const URL = `${config.serverUrl}/employeecompany?companyId=${companyId()}`;
    const request = axios.get(URL);

    return (dispatch) =>
        request.then((response) => {
            dispatch(Actions.getEmployees(response.data.Rows))
        });
}

export function saveEmployee(employee) {
    const URL = `${server}/employee`;
    let body = {
        employee,
        companyId: companyId()
    }
    const request = employee.id !== 0 ? axios.put(URL, body) : axios.post(URL, body);
    return (dispatch) =>
        request.then((res) => {
            if (res.error) {
                console.log("ERROR saveEmployee")
            } else {
                // dispatch(Actions.updateCompany(body))
                dispatch(Actions.showMessage({message: "✔ Employee information has been updated"}));

            }

        });
}


export function deleteEmployee(employeeId){
    console.log("deleteEmployee " + employeeId)

    const request = axios.delete(`${server}/employee`, {
        data: {
            employeeId: employeeId
        }
    });

    return (dispatch) =>
        request.then((res) => {
            if (res.error) {
                console.log("ERROR deleteEmployee")
            } else {
                 dispatch(getEmployees())
                dispatch(Actions.showMessage({message: "✔ Employee ahs been removed"}));

            }

        });

}