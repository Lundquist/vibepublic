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
            <div id="reservationInformation">You are unable to cancel this booking. Please contact us directly with any issues </div>
            
        </div>
    )
}
export default CancelBooking;
