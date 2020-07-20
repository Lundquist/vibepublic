import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, getReservation, getService } from '../../api'
import moment from 'moment'
import './style.scss'
const CancelBooking = (props) => {
    const dispatch = useDispatch();
    const { reservation } = useSelector(({ global }) => global.reservation);

    return (
        <div className="bookingPage">
            <div id="reservationInformation">Are you sure you want to delete your reservation for {reservation.name} at {moment(reservation.start).format('YYYY-MM-DD HH:mm')} ?</div>
            <div id="deleteButton" onClick={() => dispatch(deleteReservation(props.reservationId))}>Confirm</div>
        </div>
    )
}
export default CancelBooking;
