import React from 'react';
import './DateItem.scss'


const DateItem = (props) => {
    const { date, bookingTimes } = props;
    console.log("DateItem " + JSON.stringify(bookingTimes))
    return (
        <div className='__date__item'>
            {bookingTimes.length !== 0 ? bookingTimes.map((time, i) => <div key={i} className='__booking__time'  onClick={() =>props.setDateTime(date, time)}>{time}</div>) : <div>No times available this day</div>}
        </div>
    )
}
export default DateItem;
