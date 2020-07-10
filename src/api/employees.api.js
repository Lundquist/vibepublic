import config from '../config'
import axios from 'axios';
import store from '../store'
import * as Actions from '../store/actions';

//store.subscribe(companyId)
const server = config.serverUrl

function companyId() {
    //return 2381;
    console.log("companyID " + store.getState().global.company.information.id)
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


