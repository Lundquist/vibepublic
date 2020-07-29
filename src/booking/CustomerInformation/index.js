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


function CustomerInfo(props) {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm()
    const { customers } = useSelector(({ global }) => global.customers);
    const { information } = useSelector(({ global }) => global.company);
    const { currentPage, selectedTime } = useSelector(({ global }) => global.booking);
    const { t } = useTranslation();
    const [noteLength, setNoteLength] = useState(0);
    const [showStripe, setShowStripe] = useState(0);

    const params = new URLSearchParams(window.location.search);
    const companyId = params.get('companyId');
    if (selectedTime <= moment())
        props.history.push('/?companyId=' + companyId)


const renderStripePopUp = () => {
    return(
        <div>Stripe</div>
    )
}

    const onSubmit = (data) => {
        let existingCustomer = customers.find(customer => customer.email === data.email)

        if (existingCustomer !== undefined) {
            existingCustomer.firstName = data.firstName
            existingCustomer.lastName = data.lastName
            existingCustomer.phone = data.phone
            dispatch(saveCustomer(existingCustomer))
        } else {
            existingCustomer = {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email
            }
            dispatch(createCustomer(existingCustomer))
        }
        dispatch(Actions.setBookingNote(data.notes))
        const pathname = props.location.pathname.replace('customer-information', `customername='${existingCustomer.firstName}'/confirm-booking${props.location.search}`);
        props.history.push(pathname);



        // dispatch(Actions.goForward(currentPage))

    }
    const goBack = () => {
        dispatch(Actions.goBack(currentPage))
        props.history.goBack();
        dispatch(Actions.setSelectedTime(moment()))

    };


console.log("CustomerInFo " + showStripe)
    return (
        <div className="__payment-Page-Container">
            <h2 className='__header'><i className='material-icons' onClick={goBack}>arrow_back</i><SubHeader /> {t('completeBooking')}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='__card2'>
                {/* <select name={"payment"} ref={register({ required: true })}>
                    <option value="0">Pay at site</option>
                    <option value="1">Pay now</option>
                </select> */}
                <Select name='payment' onSelect={(e) => setShowStripe(e.value)} >
                    <option value="0">{t('paySite')}</option>
                    <option value="1">{t('payNow')}</option>
                </Select>
                <input name="firstName" placeholder={t('name')} ref={register({ required: true })} />
                {errors.exampleRequired && <span>{t('reqField')}</span>}

                <input name="lastName" placeholder={t('lastName')} ref={register({ required: true })} />
                {errors.exampleRequired && <span>{t('reqField')}</span>}

                <input name="email" placeholder={t('email')} ref={register({ required: true })} />
                {errors.exampleRequired && <span>{t('reqField')}</span>}

                <input name="phone" placeholder={t('phone')} ref={register({ required: true })} />
                {errors.exampleRequired && <span>{t('reqField')}</span>}

                <textarea name="notes" maxlength="445" placeholder={t('notes')} rows={5}
                    ref={register({ required: false })} onChange={(e) =>  setNoteLength(e.target.value.length)} />
                {noteLength > 0 ? <div id="noteLengthContainer">{noteLength} / 445 </div> : <div id="noteLengthContainer"></div>}
                <button className='__btn'>{t('bookNow')}</button>
            </form>
        </div>
    )
}

export default withReducer('calendarApp', reducer)(CustomerInfo);
