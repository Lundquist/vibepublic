import * as Actions from '../../actions';

const initialState = {
    selectedEmployee: {
        id: 0,
        firstname: "",
        lastname: ""
    },
    employees: [],
    filteredEmployees: []
}

const employeesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_SELECTED_EMPLOYEE:
            {
                return {
                    ...state,
                    selectedEmployee: action.payload
                }
            }
        case Actions.GET_EMPLOYEES:
            {
                return {
                    ...state,
                    employees: action.payload
                };
            }
        case Actions.SET_FILTERED_EMPLOYEES:
            {
                return {
                    ...state,
                    filteredEmployees: action.payload
                };
            }
        default: {
            return state
        }
    }
}
export default employeesReducer;

