
import * as Actions from '../store/actions';
import axios from 'axios';
import config from '../config'
import store from '../store'

//store.subscribe(companyId)
const server = config.serverUrl

function companyId() {
    //return 2381;
    return store.getState().global.company.information.id
}

export function saveCompanyInfo(body) {
    const URL = `${server}/company`;
    
    body.companyid = companyId();
    const request = axios.put(URL, { 
        headers: { 'Access-Control-Allow-Origin': '*' } 
    }, body);

    return (dispatch) =>
        request.then((res) => {
            if (res.error) {
                console.log("ERROR saveCompanyInfo " + JSON.stringify(res.error))
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

export function getClosedDays() {
    const URL = `${server}/companyClosedDays?companyId=${companyId()}`;
    const request = axios.get(URL);

    return (dispatch) =>
        request.then((response) => {
            if (response.error) {
                console.log("getOpeningHours ERROR " + response.error)
            } else {
                dispatch(Actions.setClosedDays(response.data.Rows))
            }
        })
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

export function getCompanySettings() {
    const URL = `${config.serverUrl}/companySettings?companyId=${companyId()}`;
    const request = axios.get(URL);
    return (dispatch) =>
        request.then((response) => {
            dispatch(Actions.setCompanySettings(response.data.Rows))
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