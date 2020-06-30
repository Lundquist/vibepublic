export const EMPLOYEES_FOR_SERVICE = '[SERVICE] EMPLOYEES_FOR_SERVICE';
export const SET_SELECTED_SERVICE = '[SERVICE] SET_SELECTED_SERVICE';
export const ADD_SERVICE = '[SERVICE] ADD_SERVICE';
export const GET_SERVICES = '[SERVICE] GET_SERVICES';
export const REMOVE_SERVICE = '[SERVICE] REMOVE_SERVICE';
export const SAVE_SERVICE = '[SERVICE] SAVE_SERVICE';
export const GET_CATEGORIES = '[SERVICE] GET_CATEGORIES';
export const SET_SELECTED_CATEGORY = '[SERVICE] SET_SELECTED_CATEGORY';


export function setSelectedService(service) {
    return (dispatch) => {
        dispatch({
            type: SET_SELECTED_SERVICE,
            payload: service
        })
    }
}

export function employeesForService(employees) {
    return (dispatch) => {
        dispatch({
            type: EMPLOYEES_FOR_SERVICE,
            payload: employees
        })
    }
}

export function getServices(services) {
    return {
        type: GET_SERVICES,
        payload: services
    }
}
export const setSelectedCategory = (payload) => ({ type: SET_SELECTED_CATEGORY, payload })
export const getCategories = (payload) => ({ type: GET_CATEGORIES, payload })
export const addService = (payload) => ({ type: ADD_SERVICE, payload });
export const saveService = (payload) => ({ type: SAVE_SERVICE, payload });
export const removeService = (payload) => ({ type: REMOVE_SERVICE, payload });

