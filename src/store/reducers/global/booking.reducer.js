import * as Actions from '../../actions';
import moment from 'moment';

const initialState = {
    currentPage: 1,
    availableHours: [],
    selectedTime: moment(),
    reservationNote: '',
    loadedAvailableHours: false,
    paymentIntent: {}

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
        case Actions.REQUEST_AVAILABLE_HOURS:
            {
                return {
                    ...state,
                    loadedAvailableHours: false
                };
            }
        case Actions.SET_AVAILABLE_HOURS:
            {
                return {
                    ...state,
                    availableHours: action.payload,
                    loadedAvailableHours: true
                };
            }
        case Actions.SET_SELECTED_TIME:
            {
                return {
                    ...state,
                    selectedTime: action.payload
                };
            }
        case Actions.SET_BOOKING_NOTE:
            {
                return {
                    ...state,
                    reservationNote: action.payload
                };
            }
        case Actions.SET_PAYMENT_INTENT:
            {
                return {
                    ...state,
                    paymentIntent: action.payload
                };
            }
        default:
            return state;
    }
}

export default bookingReducer;