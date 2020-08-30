import * as Actions from '../actions';
import moment from 'moment';

const initialState = {
    currentPage: 1,
    availableHours: [],
    selectedTime: moment(),
    bookingComplete: false

}

const bookingReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GO_FORWARD:
            {
                return {
                    ...state,
                    currentPage: action.payload + 1
                };
            }
        case Actions.GO_BACK:
            {
                return {
                    ...state,
                    currentPage: action.payload - 1
                };
            }
        case Actions.GO_TO_START:
            {
                return {
                    ...state,
                    currentPage: 1
                };
            }


        case Actions.SET_AVAILABLE_HOURS:
            {
                return {
                    ...state,
                    availableHours: action.payload
                };
            }
        case Actions.SET_SELECTED_TIME:
            {
                return {
                    ...state,
                    selectedTime: action.payload
                };
            }
        default:
            return state;
    }
}

export default bookingReducer;