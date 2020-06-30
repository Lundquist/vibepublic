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
    console.log("BookingContent")

    if (!initialized)
        dispatch(Actions.setCurrentCompany(companyId))

        const mouseDownHandler = ( event ) => {
            event.stopPropagation();
            console.log("mouseDownHandler " + event.button)
            if( event.button === 1 ) {
              // do something on middle mouse button click
            }
          }

    return (
        <div id="bookingPage" onClick={(e) => mouseDownHandler(e)}>
            <BookingHeader />
            <div id="bookingContent">
                <div id="serviceContainer">
                    <BookingServices />
                </div>
                <div id="bookingInformation">
                    <RightColumn />
                </div>
            </div>
        </div>
    )
}

export default withReducer('calendarApp', reducer)(BookingContent);
