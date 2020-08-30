import React, { useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import { createCustomer, saveCustomer } from '../../api'
import * as Actions from '../../store/actions';
import { useForm } from 'react-hook-form'
import SubHeader from '../SubHeader';
import Select from '../../ui/Select/Select';
import { useTranslation } from 'react-i18next';
import moment from 'moment'
import Stripe from './Stripe';

function CustomerInfo(props) {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm()
    const { customers } = useSelector(({ global }) => global.customers);
    const { information } = useSelector(({ global }) => global.company);
    const { currentPage, selectedTime, bookingComplete } = useSelector(({ global }) => global.booking);
    const { t } = useTranslation();
    const [noteLength, setNoteLength] = useState(0);
    const [showStripe, setShowStripe] = useState(0);

    const params = new URLSearchParams(window.location.search);
    const companyId = params.get('companyId');
    if (selectedTime <= moment() || bookingComplete)
        props.history.push('/?companyId=' + companyId)


    const renderStripePopUp = () => {
        return (
            <div>Stripe</div>
        )
    }


    const onSubmit = (data) => {
        let existingCustomer = customers.find(customer => customer.email === data.email)

        if (existingCustomer !== undefined) {
            existingCustomer.firstname = data.firstname
            existingCustomer.lastname = data.lastname
            existingCustomer.phone = data.phone
            dispatch(saveCustomer(existingCustomer))
        } else {
            existingCustomer = {
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
                email: data.email
            }
            dispatch(createCustomer(existingCustomer))
        }
        dispatch(Actions.setBookingNote(data.notes))
        const pathname = props.location.pathname.replace('customer-information', `customername='${existingCustomer.firstname}'/confirm-booking${props.location.search}`);
        props.history.push(pathname);



        // dispatch(Actions.goForward(currentPage))

    }
    const goBack = () => {
        dispatch(Actions.goBack(currentPage))
        props.history.goBack();
        dispatch(Actions.setSelectedTime(moment()))

    };

    const renderStripe = () => {
        return (
            <Stripe createCustomer={(data) => onSubmit(data)}/>
        )
    }

    const renderPayAtSite = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)} >
                <input name="firstname" placeholder={t('name')} ref={register({ required: true })} />
                {errors.exampleRequired && <span>{t('reqField')}</span>}

                <input name="lastname" placeholder={t('lastname')} ref={register({ required: true })} />
                {errors.exampleRequired && <span>{t('reqField')}</span>}

                <input name="email" placeholder={t('email')} ref={register({ required: true })} />
                {errors.exampleRequired && <span>{t('reqField')}</span>}

                <input name="phone" placeholder={t('phone')} ref={register({ required: true })} />
                {errors.exampleRequired && <span>{t('reqField')}</span>}

                <textarea name="notes" maxLength="445" placeholder={t('notes')} rows={5}
                    ref={register({ required: false })} onChange={(e) => setNoteLength(e.target.value.length)} />
                {noteLength > 0 ? <div id="noteLengthContainer">{noteLength} / 445 </div> : <div id="noteLengthContainer"></div>}
                <button className='__btn'>{t('bookNow')}</button>
            </form>
        )
    }

    return (
        <div className="__payment-Page-Container">
            <h2 className='__header'><i className='material-icons' onClick={goBack}>arrow_back</i><SubHeader /> {t('completeBooking')}</h2>
            <div className='__card2'>
                {information.stripeAccount !== null ?
                    <Select name='payment' onSelect={(htmlElm) => setShowStripe(htmlElm)} >
                        <option value="0">{t('paySite')}</option>
                        <option value="1">{t('payNow')}</option>
                    </Select>
                    : null}
                {showStripe === 0 ? renderPayAtSite() : renderStripe()}
            </div>

        </div>
    )
}

export default withReducer('calendarApp', reducer)(CustomerInfo);
