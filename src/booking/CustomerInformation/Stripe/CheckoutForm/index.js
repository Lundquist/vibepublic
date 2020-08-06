import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form'
import './style.scss'
import CardSection from '../CardSection';
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
  const { information } = useSelector(({ global }) => global.company);
  const { selectedService } = useSelector(({ global }) => global.services);

  const startStripe = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    // event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const response = await startPaymentIntent(selectedService, information.stripeAccount);

    const result = await stripe.confirmCardPayment(response.data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: event.firstName + " " + event.lastName,
          email: event.email,
          phone: event.phone
        },        
      },
      receipt_email: event.email

    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        console.log("successfully performed a payment. Whiskey for Robert")
        props.createCustomer(event)
      }
    }

  };

  return (
    <form onSubmit={handleSubmit(startStripe)}>
      <input name="firstName" placeholder={t('name')} ref={register({ required: true })} />
      {errors.exampleRequired && <span>{t('reqField')}</span>}

      <input name="lastName" placeholder={t('lastName')} ref={register({ required: true })} />
      {errors.exampleRequired && <span>{t('reqField')}</span>}

      <input name="email" placeholder={t('email')} ref={register({ required: true })} />
      {errors.exampleRequired && <span>{t('reqField')}</span>}

      <input name="phone" placeholder={t('phone')} ref={register({ required: true })} />
      {errors.exampleRequired && <span>{t('reqField')}</span>}

      <textarea name="notes" maxlength="445" placeholder={t('notes')} rows={5}
        ref={register({ required: false })} onChange={(e) => setNoteLength(e.target.value.length)} />
      {noteLength > 0 ? <div id="noteLengthContainer">{noteLength} / 445 </div> : <div id="noteLengthContainer"></div>}
      <div id="stripeCardContainer"><CardSection /></div>
      <button className='__btn'>{t('bookNow')}</button>
    </form>
  );
}

export default withReducer('calendarApp', reducer)(CheckoutForm);

