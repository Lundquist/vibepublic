import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, getReservation } from '../../api'
import moment from 'moment'

const CancelBooking = (props) => {
    const dispatch = useDispatch();
    const { reservation } = useSelector(({ global }) => global.reservation);
    
/*
    useEffect(() => {
     //   dispatch(getReservation(props.reservationId))

    }, [reservation]);
*/
    console.log("CancelBooking " + JSON.stringify(reservation))

    return (
        <div className="bookingPage">
            <div id="reservationInformation">Are you sure you want to delete your reservation at {moment(reservation.start).format('YYYY-MM-DD HH:mm')}</div>
            <div id="deleteButton" onClick={() => dispatch(deleteReservation(props.reservationId))}>Cancel</div>
        </div>
    )
}
export default CancelBooking;
