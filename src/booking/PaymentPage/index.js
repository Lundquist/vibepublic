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
            let newReservation = {
                start: moment(selectedTime).format('YYYY-MM-DD HH:mm'),
                end: moment(selectedTime).add(selectedService.time, 'minutes').format('YYYY-MM-DD HH:mm'),
                employee: selectedEmployee,
                customer: selectedCustomer,
                service: selectedService,
                price: selectedService.price,
                note: reservationNote,
                cancelationTime: cancelationTime,
                paymentIntent: paymentIntent

            }
            dispatch(addReservation(newReservation))
        }
    }, [selectedCustomer]);

    return (
        <div className="paymentPageContainer">
            {<Fragment>
                <div class="product-card">
                    <div class="product-details">
                        <h1>Confirmed</h1>
                        {selectedCustomer.firstname}, we're pleased to inform you that your booking has been successfully received and confirmed. <br /><br />
                        <b>{selectedService.name}</b> at  <b>{moment(selectedTime).format('YYYY-MM-DD HH:mm')}</b> with  <b>{selectedEmployee.firstname} {selectedEmployee.lastname}</b> <br /><br />
                 A confirmation email has been sent.

                        </div>
                </div>
            </Fragment>}
        </div>
    )

}

export default withReducer('calendarApp', reducer)(PaymentPage);

