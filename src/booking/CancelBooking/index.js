import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservation, getReservation, getService } from '../../api'
import moment from 'moment'
import './style.scss'

const CancelBooking = (props) => {
    const dispatch = useDispatch();
    const { reservation } = useSelector(({ global }) => global.reservation);
    const { information } = useSelector(({ global }) => global.company);
    const { customers } = useSelector(({ global }) => global.customers);
    const [deletePressed, setDeletePressed] = useState(false);
    const [customerEmail, setCustomerEmail] = useState(false);

    useEffect(() => {
        /*
        let customer = customers.find((element) => {
            return element.title === title;
          })
        */
    }, [customers]);


    const renderDeleteReservation = () => {
        return (
            < Fragment >
                <div class="product-card">
                    <div class="product-details">
                        <h1>Cancelar la reserva?</h1>
                        ¿Está seguro de que desea cancelar su reserva para <b>{reservation.name}</b> en <b>{moment(reservation.start).format('YYYY-MM-DD HH:mm')}</b> ? <br /><br />
                        <br /><br />
                        <div className="bookingPage">

                            <div id="deleteButton" onClick={() =>{ setDeletePressed(true); dispatch(deleteReservation(props.reservationId, reservation.paymentIntent, information.stripeAccount))}}>Confirmar</div>
                        </div>

                    </div>
                </div>
            </Fragment >
        )
    }
/** HIWA Något meddelande om att din reservation är avbokad */
    const renderDeleteConfirmation = () => {
        return (
            < Fragment >
                <div class="product-card">
                    <div class="product-details">
                        <h1>Cancelar la reserva?</h1>
                        ¿Está seguro de que desea cancelar su reserva para <b>{reservation.name}</b> en <b>{moment(reservation.start).format('YYYY-MM-DD HH:mm')}</b> ? <br /><br />
                        <br /><br />
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
            {reservation === undefined || moment().isAfter(moment(reservation.cancelationTime)) ? renderError() : deletePressed === true ? renderDeleteConfirmation() : renderDeleteReservation()}
        </div>

    )
}
export default CancelBooking;

