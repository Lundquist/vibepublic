import * as Actions from 'app/store/actions';
import axios from 'axios';
import config from '../config'
import store from 'app/store'
import { showMessage } from 'app/store/actions';

store.subscribe(companyId)

function companyId() {
    return store.getState().global.company.information.id
}


export function getServices() {
    const request = axios.get(`${config.serverUrl}/service?companyId=${companyId()}`);
    return (dispatch) =>
        request.then((response) => {
            dispatch(Actions.getServices(response.data.Rows))
        });
}

export const addService = (newService) => {
    const request = axios.post(`${config.serverUrl}/service`, {
        service: newService,
        companyId: companyId()
    });

    return (dispatch) => {
        request.then((response) => {
            if (response.data.Rows !== undefined) {
                dispatch(showMessage({ message: "✔ You service has been saved" }));
                newService.id = response.data.Rows.insertId
                dispatch({
                    type: Actions.ADD_SERVICE,
                    payload: newService
                })
            }
        });
    }
}

export const saveService = (service) => {
    const request = axios.put(`${config.serverUrl}/service`,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            service: service,
            companyId: companyId()
        })
    return (dispatch) => {
        request.then((response) => {
            if (!response.Error) {
                dispatch(showMessage({ message: "✔ You service has been saved" }));
                dispatch(getServices())
                dispatch({
                    type: Actions.SAVE_SERVICE,
                    payload: service
                })

            }

        });
    }
}

export const saveServiceImage = (service) => {
    const request = axios.put(`${config.serverUrl}/serviceImage`, {
        service,
    }, {
        'content-type': 'multipart/form-data'
    });
    return (dispatch) => {
        request.then((response) => {
            dispatch(getServices())
            /*
             dispatch({
                 type: Actions.SAVE_SERVICE_IMAGE,
                 payload: service
             })
             */
        });
    }
}

export const removeService = (id) => {
    const request = axios.delete(`${config.serverUrl}/service`, {
        data: {
            serviceId: id
        }
    });
    return (dispatch) => {
        request.then((response) => {
            dispatch({
                type: Actions.REMOVE_SERVICE,
                payload: id
            })
        });
    }
}

export function getCategories() {
    const request = axios.get(`${config.serverUrl}/category?companyId=${companyId()}`);
    return (dispatch) =>
        request.then((response) => {
            dispatch(Actions.getCategories(response.data.Rows))
        });
}

export function addCategory(data) {
    const request = axios.post(`${config.serverUrl}/category`, {
        data: data,
        companyId: companyId()
    });

    return (dispatch) =>
        request.then((response) => {
            console.log("addCategory " + JSON.stringify(response))
            dispatch(getCategories())
        });
}

export function saveCategory(categoryId, data) {
    const request = axios.put(`${config.serverUrl}/category`, {
        data: data,
        categoryId: categoryId
    });

    return (dispatch) =>
        request.then((response) => {
            dispatch(getCategories())
        });
}

export function getEmployeesForService(serviceId) {
    const request = axios.get(`${config.serverUrl}/getEmployeesForService?serviceId=${serviceId}`);
    return (dispatch) => {
        request.then((response) => {
            dispatch(Actions.employeesForService(response.data.Rows))
        });
    }
}