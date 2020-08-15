import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, getReservation, getService } from '../../api'
import moment from 'moment'
import './style.scss'

const CancelBooking = (props) => {
    const dispatch = useDispatch();
    const { reservation } = useSelector(({ global }) => global.reservation);

console.log("CancelBooking ")
console.log(JSON.stringify(props.reservationId))
console.log(JSON.stringify(reservation))

    const renderDeleteReservation = () => {

        return (
            < Fragment >
                <div class="product-card">
                    <div class="product-details">
                        <h1>Cancel Reservation?</h1>
                Are you sure you want to cancel your reservation for <b>{reservation.name}</b> at <b>{moment(reservation.start).format('YYYY-MM-DD HH:mm')}</b> ? <br /><br />
                        <br /><br />
                        <div className="bookingPage">

                            <div id="deleteButton" onClick={() => dispatch(deleteReservation(props.reservationId))}>Confirm</div>
                        </div>

                    </div>
                </div>
            </Fragment >
        )
    }

    const renderError = () => {
        return (
            <Fragment>
                <div class="product-card">
                    <div class="product-details">
                        <h1>Warning</h1>
                The current reservation can not be canceled because it is to close to the start time of the reservation. Please contact the company directly.

                    </div>
                </div>
            </Fragment>
        )
    }
    return (
        <div className="paymentPageContainer">
            {moment().isAfter(moment(reservation.cancelationTime)) ? renderError() : renderDeleteReservation()}
        </div>

    )
}
export default CancelBooking;

