import React from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer, saveCustomer } from '../../api'
import * as Actions from '../../store/actions';
import { useForm } from 'react-hook-form'
import SubHeader from '../SubHeader';
import Select from '../../ui/Select/Select';

function CustomerInfo(props) {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm()
    const { customers } = useSelector(({ global }) => global.customers);
    const { currentPage } = useSelector(({ global }) => global.booking);

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
        dispatch(Actions.goForward(currentPage))

    }
    const goBack = () => {
        dispatch(Actions.goBack(currentPage))
        props.history.goBack();
    }; // to tell the store to go back.
    return (
        <div className="__payment-Page-Container">
            <h2 className='__header'><i className='material-icons' onClick={goBack}>arrow_back</i><SubHeader /> Select Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='__card2'>
                {/* <select name={"payment"} ref={register({ required: true })}>
                    <option value="0">Pay at site</option>
                    <option value="1">Pay now</option>
                </select> */}
                <Select name='payment' onSelect={(htmlElm) => console.log(htmlElm.value)} >
                    <option value="0">Pay at site</option>
                    <option value="1">Pay now</option>
                </Select>
                <input name="firstName" placeholder="First Name" ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <input name="lastName" placeholder="Last Name" ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <input name="email" placeholder="Email" ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <input name="phone" placeholder="Phone Number" ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <textarea name="notes" placeholder="Notes" rows={5}
                    ref={register({ required: false })} />

                <button className='__btn'>Book now</button>
            </form>
        </div>
    )
}

export default CustomerInfo;
