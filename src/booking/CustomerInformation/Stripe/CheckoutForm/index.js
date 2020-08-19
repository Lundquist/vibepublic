import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import './style.scss'
import CardSection from '../CardSection';
import {setPaymentIntent} from '../../../../store/actions'
import { startPaymentIntent } from '../../../../api'
import withReducer from '../../../../store/withReducer';
import reducer from '../../../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';


function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useForm()
  const [noteLength, setNoteLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const { information } = useSelector(({ global }) => global.company);
  const { selectedService } = useSelector(({ global }) => global.services);
  const dispatch = useDispatch();
  const startStripe = async (event) => {

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true)
    const response = await startPaymentIntent(selectedService, information.stripeAccount);

    const result = await stripe.confirmCardPayment(response.data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: event.firstname + " " + event.lastname,
          email: event.email,
          phone: event.phone
        },
      },
      receipt_email: event.email

    });
    console.log("CheckOutForm 0 " + JSON.stringify(response))
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      setLoading(false)

      console.log("CheckOutForm " + result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        setLoading(false)
        dispatch(setPaymentIntent(result.paymentIntent.id))
        props.createCustomer(event)
      }
    }

  };

  return (
    <form onSubmit={handleSubmit(startStripe)}>
      <input name="firstname" placeholder={t('name')} ref={register({ required: true })} />
      {errors.exampleRequired && <span>{t('reqField')}</span>}

      <input name="lastname" placeholder={t('lastname')} ref={register({ required: true })} />
      {errors.exampleRequired && <span>{t('reqField')}</span>}

      <input name="email" placeholder={t('email')} ref={register({ required: true })} />
      {errors.exampleRequired && <span>{t('reqField')}</span>}

      <input name="phone" placeholder={t('phone')} ref={register({ required: true })} />
      {errors.exampleRequired && <span>{t('reqField')}</span>}

      <textarea name="notes" maxlength="445" placeholder={t('notes')} rows={5}
        ref={register({ required: false })} onChange={(e) => setNoteLength(e.target.value.length)} />
      {noteLength > 0 ? <div id="noteLengthContainer">{noteLength} / 445 </div> : <div id="noteLengthContainer"></div>}
      <div id="stripeCardContainer"><CardSection /></div>
      <div id="confirmContainer">
        {loading ? <div className={loading ? "lds-dual-ring" : "VibeImageSpinnerLoaded"} />
          : <button className='__btn'>{t('bookNow')}</button>}
      </div>
    </form>
  );
}

export default withReducer('calendarApp', reducer)(CheckoutForm);

