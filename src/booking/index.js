import React from 'react';
import BookingHeader from './Header'
import RightColumn from './RightColumn'
import BookingServices from './BookingServices'
import './style.scss';
import withReducer from '../store/withReducer';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import CancelBooking from './CancelBooking'
import { getReservation } from '../api'

function BookingContent(props) {
    const dispatch = useDispatch();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const companyId = params.get('companyId');
    const { initialized } = useSelector(({ global }) => global.company);
    const cancelReservation = params.get('cancelReservation');
    console.log("BookingContent " + cancelReservation)

    if (!initialized && companyId)
        dispatch(Actions.setCurrentCompany(companyId))

    dispatch(getReservation(cancelReservation))

    const getBooking = () => {
        return (
            <div className="bookingPage">
                <BookingHeader />
                <div className='__flex-strech __container __bookings-content'>
                    <div className='__f1'><BookingServices /></div>
                    <RightColumn />
                </div>
            </div>
        )
    }
    console.log("bookingThingy " + cancelReservation)
    return (
        <div>
            {cancelReservation !== null ? <CancelBooking reservationId={cancelReservation} /> : getBooking()}
        </div>
    )
}

export default withReducer('calendarApp', reducer)(BookingContent);
