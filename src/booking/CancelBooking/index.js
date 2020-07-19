import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation } from '../../api'


const CancelBooking = (props) => {
    const dispatch = useDispatch();

    return (
        <div className="bookingPage">
            <div id="deleteButton" onClick={() => dispatch(deleteReservation(props.reservationId))}>Cancel!</div>
        </div>
    )
}
export default CancelBooking;
