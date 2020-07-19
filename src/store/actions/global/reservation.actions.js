export const SET_RESERVATION = '[GLOBAL] SET_RESERVATION';

export function setReservation(reservation) {
    return (dispatch) =>
        dispatch({
            type: SET_RESERVATION,
            payload: reservation
        })
}