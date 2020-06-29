import axios from 'axios';
import config from 'app/config'

export const SET_SELECTED_EMPLOYEE = '[EMPLOYEES] SET_SELECTED_EMPLOYEE';
export const SET_FILTERED_EMPLOYEES = '[EMPLOYEES] FILTERED_EMPLOYEES';
export const SET_EMPLOYEES = '[EMPLOYEES] SET_EMPLOYEES';
export const GET_EMPLOYEES = '[EMPLOYEES] GET_EMPLOYEES';
export const GET_AVAILABLE_HOURS = '[EMPLOYEES] GET_AVAILABLE_HOURS';

export function setSelectedEmployee(employee) {
    return (dispatch) =>
        dispatch({
            type: SET_SELECTED_EMPLOYEE,
            payload: employee
        })
}

export function getEmployees(employees){
    return (dispatch) =>
        dispatch({
            type: GET_EMPLOYEES,
            payload: employees
        })
}

export function setEmployeesFilter(employees) {
    return (dispatch) => (
        dispatch({
            type: SET_FILTERED_EMPLOYEES,
            payload: employees
        })
    )
}
