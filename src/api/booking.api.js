import config from '../config'
import axios from 'axios';
import * as Actions from '../store/actions';
import store from '../store'

//store.subscribe(companyId)

function companyId() {
    //return 2381;
    return store.getState().global.company.information.id
}

export function getAvailableHours(employeeId, selectedDate, serviceTime) {
    const request = axios.get(`${config.serverUrl}/availableHours?employeeId=${employeeId}&selectedDay=${selectedDate}&serviceTime=${serviceTime}`);
    return (dispatch) =>
        request.then((response) => {
            dispatch(Actions.setAvailableHours(response.data))
        });
}