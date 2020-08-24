import React, { useState, useEffect } from 'react';
import './Calender.scss';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import * as Actions from '../../store/actions';
import { getAvailableHours, getCustomers } from '../../api'
import { useTranslation } from 'react-i18next';
import CalenderHeaderTitle from './CalenderHeader';
import DateItem from './DateItem';
import SubHeader from '../SubHeader'
import { setSelectedEmployee } from '../../store/actions';
import config from '../../config';
import LoadingIndicator from '../../ui/LoadingIndicator'

function SelectDate(props) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { availableHours, currentPage, loadedAvailableHours } = useSelector(({ global }) => global.booking);
    const { selectedEmployee } = useSelector(({ global }) => global.employees);
    const { selectedService } = useSelector(({ global }) => global.services);
    const { closedDays, settings } = useSelector(({ global }) => global.company);
    const [bookings, setBookings] = useState([]);
    const [currentDate, setCurrentDate] = useState(moment());

    const params = new URLSearchParams(window.location.search);
    const companyId = params.get('companyId');
    if (selectedEmployee.id === 0)
        props.history.push('/?companyId=' + companyId)


    console.log("SelectDate " + JSON.stringify(settings))
    const goBack = () => {
        dispatch(Actions.goBack(currentPage))
        props.history.goBack();
        dispatch(Actions.setSelectedEmployee({
            id: 0,
            firstname: "",
            lastname: ""
        }))
    };
    useEffect(() => {
        sortBookings()
    }, [availableHours]);


    function setDateTime(date, time) {
        const [hours, minutes] = time.split(':');
        let dateTime = date.set({ hours, minutes })
        dispatch(Actions.setSelectedTime(moment(dateTime).format('YYYY-MM-DD HH:mm')))
        dispatch(Actions.goForward(currentPage))
        dispatch(getCustomers)
        const pathname = props.location.pathname.replace('select-booking-time', `bookingtime='${time}'/customer-information${props.location.search}`);
        props.history.push(pathname);
    }

    const changeWeek = (showPrevious = false) => {
        if (currentDate.clone().subtract(6, 'days').isBefore(moment()) && showPrevious) {
            return;
        }

        let lastDate = moment();
        if (settings.bookingLimit === 1)
            lastDate.add(1, 'days')
        if (settings.bookingLimit === 2)
            lastDate.add(2, 'days')
        if (settings.bookingLimit === 3)
            lastDate.add(4, 'days')
        if (settings.bookingLimit === 4)
            lastDate.add(7, 'days')
        if (settings.bookingLimit === 5)
            lastDate.add(14, 'days')
        if (settings.bookingLimit === 6)
            lastDate.add(21, 'days')
        if (settings.bookingLimit === 7)
            lastDate.add(1, 'months')
        if (settings.bookingLimit === 8)
            lastDate.add(2, 'months')
        if (settings.bookingLimit === 9)
            lastDate.add(3, 'months')

        if (settings.bookingLimit !== 0 && currentDate.clone().add(6, 'days').isAfter(lastDate)) {
            return;
        }

        showPrevious === true ? setCurrentDate(currentDate.subtract(7, 'days')) : setCurrentDate(currentDate.add(7, 'days'));
        dispatch(getAvailableHours(selectedEmployee.id, currentDate, selectedService.time))
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
            let dayIsClosed = false;
            closedDays.map((v, k) => {
                if (moment(v.date).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD'))
                    dayIsClosed = true;
            })

            if (moment(date).format('YYYY-MM-DD') === moment(bookingItem).format('YYYY-MM-DD') && !dayIsClosed) {
                bookingTimes.push(moment(bookingItem).format('HH:mm'));
            }
        });

        return bookingTimes
    }


    const checkIfAvailableThisWeek = () => {
        let showTimes = false;
        bookings.map((booking) => {
            if (booking.bookingTimes.length > 0)
                showTimes = true;
        })

        return showTimes;
    }

    const showNoTimesMessage = () => {
        return (
            <div id="noTimesContainer">
                <div id="noTimesImage"></div>

                <div id="noTimesText">No times available this week, try later.</div>
            </div>
        )
    }

    const renderLoading = () => {
        return (
            <LoadingIndicator active={true} />
        )
    }

    const renderContent = () => {
        return (
            <div>
                <div className='__flex __calander_booking_header'>
                    {bookings.map((booking, i) => <CalenderHeaderTitle {...booking} key={i} />)}
                </div>
                <div className='__main_calender __f1 __flex-strech'>
                    {checkIfAvailableThisWeek() ? bookings.map((booking) => <DateItem key={booking.date} {...booking} setDateTime={(d, t) => setDateTime(d, t)} />) : showNoTimesMessage()}
                </div>
            </div>
        )
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
                            <span>{t('earlier')}</span>
                        </div>
                        {bookings.length > 0 && <div className="no-select">{currentDate.format('DD')} - {currentDate.clone().add(6, 'days').format('DD')} {currentDate.format('MMM')}</div>}
                        <div className='__flex no-select' onClick={() => changeWeek()}>
                            <span>{t('later')}</span>
                            <i className='material-icons'>keyboard_arrow_right</i>
                        </div>
                    </header>
                    {loadedAvailableHours ? renderContent() : renderLoading()}
                </div>
            </div>
        </div>
    )
}

export default withReducer('calendarApp', reducer)(SelectDate);