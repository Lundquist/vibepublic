import React, { useState, Fragment } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import { addReservation } from '../../api'
import moment from 'moment';

function PaymentPage(props) {
    const dispatch = useDispatch();
    const { selectedTime } = useSelector(({ global }) => global.booking);
    const { selectedEmployee } = useSelector(({ global }) => global.employees);
    const { selectedService } = useSelector(({ global }) => global.services);
    const { selectedCustomer } = useSelector(({ global }) => global.customers);
    const [showToast, setShowToast] = useState(false);

    /*
    const stripe = window.Stripe("pk_test_wguKhnBNi9r1x4gDqXkgITv200M57KPGJm");

    async function handleStripe(e) {
        /*
        const session = await Actions.payWithStripe({ customer: "Robert", price: 1337 }) .then(response => {
            console.log("1111 " + session)
            const {error} = stripe.redirectToCheckout({
                // Make the id field from the Checkout Session creation API response
                // available to this file, so you can provide it as parameter here
                // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                sessionId: response.result.id
              }).then(response2 => {
                    console.log("magass " + session)
              })
              console.log(error.message)
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer
              // using `error.message`.
              
        })

         * start: YYYY-MM-DD HH:mm:ss
 * end: YYYY-MM-DD HH:mm:ss
 * employee: The ID of the employee
 * service: ID of the service
 * customer: ID of the customer.
 * note: note about the reservation
 * price: price of the service

       
    } */

    const submit = () => {
        setShowToast(false);
        setShowToast(true);
        let newReservation = {
            start: selectedTime,
            end: moment(selectedTime).add(selectedService.time, 'minutes').format('YYYY-MM-DD HH:mm'),
            employee: selectedEmployee.id,
            customer: selectedCustomer.userId,
            service: selectedService.id,
            price: selectedService.price

        }
        console.log("submit " + JSON.stringify(newReservation))
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

