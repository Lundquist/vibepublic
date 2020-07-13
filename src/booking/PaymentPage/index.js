import React, { useState, Fragment } from 'react';
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
    const [showToast, setShowToast] = useState(false);

     const submit = () => {
        setShowToast(false);
        setShowToast(true);
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

    return (
        <div className="paymentPageContainer">
            {showToast ? <Fragment>
                <h1>You have successfully booked your ticket</h1>
                <h2>A confirmation email has been sent to your email</h2>
            </Fragment> : <Fragment>
                <div className="paymentInformation">
                    <div id="welcomeText">
                        <span className="bold">Hello {selectedCustomer.firstName}</span>!
                </div>
                    <div id="bookingSettings">
                        This is the reservation information.  <br />
                    You have made a reservation for {selectedService.name} at {selectedTime} with {selectedEmployee.firstName} {selectedEmployee.lastName}
                        <br />
                    Please make sure it is accurate before submitting.
                </div>

                </div>
                <div className="__btn" onClick={() => submit()}>confirm</div>
            </Fragment>}
        </div>
    )

}

export default withReducer('calendarApp', reducer)(PaymentPage);

