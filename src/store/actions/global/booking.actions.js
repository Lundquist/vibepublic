export const GO_FORWARD = '[BOOKING] GO_FORWARD';
export const GO_BACK = '[BOOKING] GO_BACK';
export const REQUEST_AVAILABLE_HOURS = '[BOOKING] REQUEST_AVAILABLE_HOURS';
export const SET_AVAILABLE_HOURS = '[BOOKING] SET_AVAILABLE_HOURS';
export const SET_SELECTED_TIME = '[BOOKING] SET_SELECTED_TIME';
export const GO_TO_START = '[BOOKING] GO_TO_START';
export const SET_BOOKING_NOTE = '[BOOKING] SET_BOOKING_NOTE';
export const SET_PAYMENT_INTENT = '[BOOKING] SET_PAYMENT_INTENT';
export const SET_BOOKING_COMPLETE = '[BOOKING] SET_BOOKING_COMPLETE';

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
export function setBookingComplete() {
    return {
        type: SET_BOOKING_COMPLETE
    }
}
export function setAvailableHours(hours) {
    return {
        type: SET_AVAILABLE_HOURS,
        payload: hours
    }
}

export function requestAvailableHours() {
    return {
        type: REQUEST_AVAILABLE_HOURS
    }
}
export function setSelectedTime(time) {
    return {
        type: SET_SELECTED_TIME,
        payload: time
    }
}

export function setBookingNote(note) {
    return {
        type: SET_BOOKING_NOTE,
        payload: note
    }
}

export function setPaymentIntent(intent){
    return {
        type: SET_PAYMENT_INTENT,
        payload: intent
    }
}




