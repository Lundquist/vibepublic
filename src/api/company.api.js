
import * as Actions from 'app/store/actions';
import axios from 'axios';
import config from '../config'
import store from 'app/store'

store.subscribe(companyId)
const server = config.serverUrl

function companyId() {
    return store.getState().global.company.information.id
}

export function saveCompanyInfo(body) {
    const URL = `${server}/company`;
    body.companyid = companyId();
    const request = axios.put(URL, body);

    return (dispatch) =>
        request.then((res) => {
            if (res.error) {
                console.log("ERROR SAVECOMPANYINFO")
            } else {
                dispatch(Actions.updateCompany(body))
            }

        });
}

export function saveOpeningHours(openingHours) {
    const URL = `${server}/openingHours`;
    let post = {
        openingHours: openingHours,
        companyId: companyId()
    }
    const request = axios.post(URL, post);

    return (dispatch) =>
        request.then((res) => {
            if (res.error) {
                console.log("saveOpeningHours ERROR " + res.error)
            } else {
                dispatch(Actions.setOpeningHours(openingHours))
            }

        });
}

export function getOpeningHours() {
    const URL = `${server}/openingHours?companyId=${companyId()}`;
    const request = axios.get(URL);

    return (dispatch) =>
        request.then((response) => {
            if (response.error) {
                console.log("saveOpeningHours ERROR " + response.error)
            } else {
                dispatch(Actions.setOpeningHours(response.data.Rows))
            }

        });
}

export function putCompanySettings(companySettings) {
    const URL = `${config.serverUrl}/companySettings?companyId=${companyId()}`;
    const request = axios.put(URL, {
        data: companySettings
    });
    
    return (dispatch) =>
        request.then((response) => {            
            dispatch(Actions.setCompanySettings(companySettings))
            
        });
}