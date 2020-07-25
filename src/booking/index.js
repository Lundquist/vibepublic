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
import {Helmet} from "react-helmet";

function BookingContent(props) {
    const dispatch = useDispatch();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const companyId = params.get('companyId');
    const { initialized, information } = useSelector(({ global }) => global.company);
    const cancelReservation = params.get('cancelReservation');

    if (!initialized && companyId)
        dispatch(Actions.setCurrentCompany(companyId))

    if (cancelReservation !== null)
        dispatch(getReservation(cancelReservation))

    if (!companyId && !cancelReservation)
        window.location.href = 'https://www.vibescheduling.com/'

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

    return (
        <div>
            <Helmet>
                <title>{information.name}</title>
            </Helmet>

            {cancelReservation !== null ? <CancelBooking reservationId={cancelReservation} /> : getBooking()}
        </div>
    )
}

export default withReducer('calendarApp', reducer)(BookingContent);
