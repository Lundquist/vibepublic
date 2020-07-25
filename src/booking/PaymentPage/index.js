import React, { useEffect, Fragment } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import { addReservation } from '../../api'
import moment from 'moment';

function PaymentPage(props) {
    const dispatch = useDispatch();
    const { selectedTime, reservationNote } = useSelector(({ global }) => global.booking);
    const { selectedEmployee } = useSelector(({ global }) => global.employees);
    const { selectedService } = useSelector(({ global }) => global.services);
    const { selectedCustomer } = useSelector(({ global }) => global.customers);


    useEffect(() => {
        if (selectedCustomer !== '') {
            let newReservation = {
                start: selectedTime,
                end: moment(selectedTime).add(selectedService.time, 'minutes').format('YYYY-MM-DD HH:mm'),
                employee: selectedEmployee.id,
                customer: selectedCustomer.userId,
                service: selectedService.id,
                price: selectedService.price,
                note: reservationNote

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
                        {selectedCustomer.firstName}, we're pleased to inform you that your booking has been successfully received and confirmed. <br /><br />
                        <b>{selectedService.name}</b> at  <b>{selectedTime}</b> with  <b>{selectedEmployee.firstName} {selectedEmployee.lastName}</b> <br /><br />
                 A confirmation email has been sent.

                        </div>
                </div>
            </Fragment>}
        </div>
    )

}

export default withReducer('calendarApp', reducer)(PaymentPage);

