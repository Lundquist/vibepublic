import React from 'react';
import BookingHeader from './Header'
import RightColumn from './RightColumn'
import BookingServices from './BookingServices'
import './style.scss';
import withReducer from '../store/withReducer';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function BookingContent(props) {
    const dispatch = useDispatch();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const companyId = params.get('companyId');
    const { initialized } = useSelector(({ global }) => global.company);
        
    if(!initialized)
    dispatch(Actions.setCurrentCompany(companyId))

    const mouseDownHandler = (event) => {
        event.stopPropagation();
        if (event.button === 1) {
            // do something on middle mouse button click
        }
    }

    return (
        <div className="bookingPage" onClick={(e) => mouseDownHandler(e)}>
            <BookingHeader />
            <div className='__flex-strech __container __bookings-content'>
                <div className='__f1'><BookingServices /></div>
                <RightColumn />
            </div>
        </div>
    )
}

export default withReducer('calendarApp', reducer)(BookingContent);
