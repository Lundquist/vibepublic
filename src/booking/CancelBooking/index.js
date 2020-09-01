import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, getReservation, getService } from '../../api'
import moment from 'moment'
import './style.scss'

const CancelBooking = (props) => {
    const dispatch = useDispatch();
    const { reservation } = useSelector(({ global }) => global.reservation);
    const { information } = useSelector(({ global }) => global.company);

console.log(JSON.stringify(information))

    const renderDeleteReservation = () => {

        return (
            < Fragment >
                <div class="product-card">
                    <div class="product-details">
                        <h1>Cancelar la reserva?</h1>
                        ¿Está seguro de que desea cancelar su reserva para <b>{reservation.name}</b> en <b>{moment(reservation.start).format('YYYY-MM-DD HH:mm')}</b> ? <br /><br />
                        <br /><br />
                        <div className="bookingPage">

                            <div id="deleteButton" onClick={() => dispatch(deleteReservation(props.reservationId, reservation.paymentIntent, information.stripeAccount))}>Confirmar</div>
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
                        <h1>Lo siento</h1>
                        La reserva actual ya no se puede cancelar. Para mas informacion póngase en contacto directamente con la empresa.
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

