import * as Actions from '../../../actions';
import moment from 'moment'
const initialState = {
    selectedCustomer: {
        id: 0,
        firstName: "Choose one"
    },
    selectedReservation: {
        id:0,
        start: moment(Math['ceil']((+moment()) / (+moment.duration(15, "minutes"))) * (+moment.duration(15, "minutes"))),
        end: null,
        note: ""

    },
    selectedEmployee: {
        id: 0,
        firstName: "Choose one"
    },
    employees: [],
    selectedService: {
        id:0,
        name:"Choose one"
    },
};

const booking = function (state = initialState, action) {
    switch (action.type) {
        case Actions.RESET_BOOKING_PANEL: {
            return initialState
        }
        case Actions.BOOKING_PANEL: {
            return {
                ...state,
                selectedReservation: {
                    id: action.payload.id,
                    start: moment(action.payload.start),
                    end: moment(action.payload.end),
                    note: action.payload.note,
                    customer: action.payload.customer,
                    price: action.payload.price,
                    service: action.payload.service
                },
            }
        }
        case Actions.BOOKING_TIME: {
            return {
                ...state,
                selectedReservation: {...state.selectedReservation, start: action.payload}
            }
        }
        case Actions.BOOKING_CUSTOMER: {
            return {
                ...state,
                selectedCustomer: action.payload,
            }
        }
        case Actions.BOOKING_EMPLOYEE: {
            return {
                ...state,
                selectedEmployee: action.payload
            }
        }
        case Actions.BOOKING_SERVICE: {
            return {
                ...state,
                selectedService: action.payload,
                selectedEmployee: initialState.selectedEmployee
            }
        }
        case Actions.BOOKING_EMPLOYEE_SERVICES: {
            return {
                ...state,
                employees: action.payload
            }
        }
        case Actions.BOOKING_INTERNAL_NOTE: {
            return {
                ...state,
                selectedReservation: {
                    ...state.selectedReservation,
                    note: action.payload
                }
            }
        }
        default: {
            return state;
        }
    }
};

export default booking;
