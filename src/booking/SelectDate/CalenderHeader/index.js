import React from 'react';
import './CalenderHeaderTitle.scss';
import moment from 'moment';
const CalenderHeaderTitle = ({ date, bookingTimes }) => {
    const today = moment();
    const isSameDate = date.isSame(today, 'day')
    return (
        <div className={`__calander_booking_title ${isSameDate || bookingTimes.length > 0 ? 'black' : '' }`}>
            <div className='squar'>
                <div>
                    <b>{date.format('ddd')}</b>
                    <h2>{date.format('DD')}</h2>
                    {isSameDate === today.year() && <span className='dot'></span>}
                </div>
            </div>
        </div>
    )
}

export default CalenderHeaderTitle;