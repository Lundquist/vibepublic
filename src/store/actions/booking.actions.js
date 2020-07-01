export const GO_FORWARD = '[BOOKING] GO_FORWARD';
export const GO_BACK = '[BOOKING] GO_BACK';
export const SET_AVAILABLE_HOURS = '[BOOKING] SET_AVAILABLE_HOURS';
export const SET_SELECTED_TIME = '[BOOKING] SET_SELECTED_TIME';
export const GO_TO_START = '[BOOKING] GO_TO_START';
export const EMPLOYEES_FOR_SERVICE = '[SERVICE] EMPLOYEES_FOR_SERVICE';
export const GET_CUSTOMERS = '[CUSTOMERS] GET CUSTOMERS';
export const SET_CUSTOMER = '[CUSTOMERS] SET_CUSTOMER';

export function goForward(currentPage) {
    return {
        type: GO_FORWARD,
        payload: currentPage
    }
}

export function goBack(currentPage) {
    return {
        type: GO_BACK,
        payload: currentPage
    }
}

export function goToStart() {
    return {
        type: GO_TO_START
    }
}

export function setAvailableHours(hours) {
    return {
        type: SET_AVAILABLE_HOURS,
        payload: hours
    }
}


export function setSelectedTime(time) {
    return {
        type: SET_SELECTED_TIME,
        payload: time
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

export function getCustomers(data) {
    return {
        type: GET_CUSTOMERS,
        payload: data
    }
}

export function setCustomer(customer) {
    return {
        type: SET_CUSTOMER,
        payload: customer
    }
}

export function setCurrentCompany(companyId = 1) {
    const URL = `${config.serverUrl}/company?companyId=${companyId}`;
    const request = axios.get(URL, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
console.log("booking/setCurrentCompany " + companyId)
    return (dispatch) => {
        request.then((response) => {
            if (!response.data.Error) {

                dispatch({
                    type: SET_COMPANY,
                    payload: response.data.Rows[0]
                })
            }
        })
    }
}