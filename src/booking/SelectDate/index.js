import React, { useState, useEffect } from 'react';
import './Calender.scss';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment'
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import * as Actions from '../../store/actions';
import { getAvailableHours, getCustomers } from '../../api'
import { useTranslation } from 'react-i18next';
import CalenderHeaderTitle from './CalenderHeader';
import DateItem from './DateItem';
import SubHeader from '../SubHeader'
function SelectDate(props) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { availableHours, currentPage } = useSelector(({ global }) => global.booking);
    const { selectedEmployee } = useSelector(({ global }) => global.employees);
    const { selectedService } = useSelector(({ global }) => global.services);
    const [bookings, setBookings] = useState([]);
    const [currentDate, setCurrentDate] = useState(moment());

    const goBack = () => {
        dispatch(Actions.goBack(currentPage))
        props.history.goBack();
      }; // to tell the store to go back.

    useEffect(() => {
        sortBookings()
    }, [availableHours]);


    function setDateTime(date, time) {
        dispatch(Actions.setSelectedTime(date.format('YYYY-MM-DD ') + time))
        dispatch(Actions.goForward(currentPage))
        dispatch(getCustomers)
        const pathname = props.location.pathname.replace('select-booking-time', `bookingtime='${time}'/customer-information${props.location.search}`);
        props.history.push(pathname);
    }

    const changeWeek = (showPrevious = false) => {
        if (currentDate.clone().subtract(6, 'days').isBefore(moment()) && showPrevious) {
            return;
        }
        showPrevious === true ? setCurrentDate(currentDate.subtract(7, 'days')) : setCurrentDate(currentDate.add(7, 'days'));
        dispatch(getAvailableHours(selectedEmployee.id, currentDate, selectedService.id))
    }

    const sortBookings = () => {
        let sortedBookings = [];
        for (let i = 0; i < 7; i++) {
            const nxtdate = currentDate.clone().add(i, 'days')
            sortedBookings.push({
                date: nxtdate,
                bookingTimes: getBookingTimes(nxtdate),
            });
        }
        setBookings(sortedBookings)
    }

    const getBookingTimes = (date) => {
        const bookingTimes = [];
        availableHours.forEach(bookingItem => {
            if (moment(date).format('YYYY-MM-DD') === moment(bookingItem).format('YYYY-MM-DD')) {
                bookingTimes.push(moment(bookingItem).format('HH:mm'));
            }
        });
        return bookingTimes
    }

    return (
        <div id="selectDateAndTimeContainer">
            <div className='__header'>
                <h2 className='__header'><i className='material-icons' onClick={goBack}>arrow_back</i><SubHeader /> Select time</h2>
            </div>
            <div id="dateAndTimContainer">
                <div className='__app__calender __col'>
                    <header className='__flex __sb'>
                        <div className={`__flex no-select ${currentDate <= moment() ? 'grey' : ''}`} onClick={() => changeWeek(true)}>
                            <i className='material-icons'>keyboard_arrow_left</i>
                            <span>Earlier</span>
                        </div>
                        {bookings.length > 0 && <div className="no-select">{currentDate.format('DD')} - {currentDate.clone().add(6, 'days').format('DD')} {currentDate.format('MMM')}</div>}
                        <div className='__flex no-select' onClick={() => changeWeek()}>
                            <span>Later</span>
                            <i className='material-icons'>keyboard_arrow_right</i>
                        </div>
                    </header>
                    <div className='__flex __calander_booking_header'>
                        {bookings.map((booking, i) => <CalenderHeaderTitle {...booking} key={i} />)}
                    </div>
                    <div className='__main_calender __f1 __flex-strech'>
                        {bookings.map((booking) => <DateItem key={booking.date} {...booking} setDateTime={(d, t) => setDateTime(d, t)} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withReducer('calendarApp', reducer)(SelectDate);