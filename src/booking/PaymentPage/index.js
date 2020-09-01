import React, { useEffect, Fragment } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import { addReservation } from '../../api'
import moment from 'moment';
import * as Actions from '../../store/actions';

function PaymentPage(props) {
    const dispatch = useDispatch();
    const { selectedTime, reservationNote, paymentIntent } = useSelector(({ global }) => global.booking);
    const { selectedEmployee } = useSelector(({ global }) => global.employees);
    const { selectedService } = useSelector(({ global }) => global.services);
    const { selectedCustomer } = useSelector(({ global }) => global.customers);
    const { settings } = useSelector(({ global }) => global.company);



    const params = new URLSearchParams(window.location.search);
    const companyId = params.get('companyId');
    if (selectedTime <= moment() && selectedService.id === 0 && selectedEmployee.id === 0)
        props.history.push('/?companyId=' + companyId)

    useEffect(() => {
        if (selectedCustomer !== '') {
            let cancelationTime = moment(selectedTime).subtract(settings.cancelationLimit, 'days').format('YYYY-MM-DD HH:mm');
            let reminderTime = '';
            if (settings.confirmationEmail === 0) {
            } else if (settings.confirmationEmail === 1) {
                reminderTime = moment(selectedTime).subtract(6, 'hours').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            } else if (settings.confirmationEmail === 2) {
                reminderTime = moment(selectedTime).subtract(12, 'hours').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            } else if (settings.confirmationEmail === 3) {
                reminderTime = moment(selectedTime).subtract(1, 'days').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            } else if (settings.confirmationEmail === 4) {
                reminderTime = moment(selectedTime).subtract(2, 'days').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            } else if (settings.confirmationEmail === 5) {
                reminderTime = moment(selectedTime).subtract(4, 'days').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            } else if (settings.confirmationEmail === 6) {
                reminderTime = moment(selectedTime).subtract(1, 'weeks').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            } else if (settings.confirmationEmail === 7) {
                reminderTime = moment(selectedTime).subtract(2, 'weeks').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            } else if (settings.confirmationEmail === 8) {
                reminderTime = moment(selectedTime).subtract(3, 'weeks').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            } else if (settings.confirmationEmail === 9) {
                reminderTime = moment(selectedTime).subtract(1, 'month').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            } else if (settings.confirmationEmail === 10) {
                reminderTime = moment(selectedTime).subtract(2, 'month').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            } else if (settings.confirmationEmail === 11) {
                reminderTime = moment(selectedTime).subtract(3, 'month').format('ddd, DD MMM YYYY HH:mm:ss ZZ');
            }




            console.log("yayayayaya " + reminderTime)
            //moment(selectedTime).subtract(settings.confirmationEmail, 'days').format('YYYY-MM-DD HH:mm');
            let newReservation = {
                start: moment(selectedTime).format('YYYY-MM-DD HH:mm'),
                end: moment(selectedTime).add(selectedService.time, 'minutes').format('YYYY-MM-DD HH:mm'),
                employee: selectedEmployee,
                customer: selectedCustomer,
                service: selectedService,
                price: selectedService.price,
                note: reservationNote,
                cancelationTime: cancelationTime,
                paymentIntent: paymentIntent,
                reminderTime: reminderTime

            }
            dispatch(addReservation(newReservation))
        }
    }, [selectedCustomer]);

    return (
        <div className="paymentPageContainer">
            {<Fragment>
                <div class="product-card">
                    <div class="product-details">
                        <h1>Confirmada</h1>
                        {selectedCustomer.firstname}, nos complace informarle que su reserva ha sido recibida y confirmada correctamente. <br /><br />
                        <b>{selectedService.name}</b> en  <b>{moment(selectedTime).format('YYYY-MM-DD HH:mm')}</b> con  <b>{selectedEmployee.firstname} {selectedEmployee.lastname}</b> <br /><br />
                        Un correo electrónico de confirmación ha sido enviado.

                        </div>
                </div>
            </Fragment>}
        </div>
    )

}

export default withReducer('calendarApp', reducer)(PaymentPage);

