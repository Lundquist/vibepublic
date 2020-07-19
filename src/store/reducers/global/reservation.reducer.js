import * as Actions from '../../actions';

const initialState = {
    reservation: {
        start: '',
        end: '',
        service: '',
        employee: ''
    }
}

const reservationReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_RESERVATION:{
            console.log("reservationReducer " + JSON.stringify(action.payload))

            return {
                ...state,
                reservation: action.payload
            }
        }
        default: {
            return state
        }
    }
}
export default reservationReducer;
