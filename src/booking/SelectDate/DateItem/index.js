import React from 'react';
import './DateItem.scss'


const DateItem = (props) => {
    const { date, bookingTimes } = props;
    return (
        <div className='__date__item'>
            {bookingTimes.map((time, i) => <div key={i} className='__booking__time'  onClick={() =>props.setDateTime(date, time)}>{time}</div>)}
        </div>
    )
}
export default DateItem;
