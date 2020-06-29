import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer, saveCustomer } from 'app/api'
import * as Actions from 'app/store/actions';
import { useForm } from 'react-hook-form'
import SubHeader from '../SubHeader'
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
        dispatch(Actions.goForward(currentPage))

    }

    return (
        <div className="paymentPageContainer">
            <div className="paymentHeader">
                <SubHeader /> Details </div>
            <div className="customerInformationContainer">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <select name={"payment"}  ref={register({ required: true })}>
                        <option value="0">Pay at site</option>
                        <option value="1">Pay now</option>
                    </select>
                    <input name="firstName" placeholder="First Name" ref={register({ required: true })} />
                    {errors.exampleRequired && <span>This field is required</span>}

                    <input name="lastName" placeholder="Last Name" ref={register({ required: true })} />
                    {errors.exampleRequired && <span>This field is required</span>}

                    <input name="email" placeholder="Email" ref={register({ required: true })} />
                    {errors.exampleRequired && <span>This field is required</span>}

                    <input name="phone" placeholder="Phone Number" ref={register({ required: true })} />
                    {errors.exampleRequired && <span>This field is required</span>}

                    <input name="notes" placeholder="Notes" rows={5}
                        ref={register({ required: false })} />

                    <input type="submit" />
                </form>

            </div>
        </div>
    )
}

export default CustomerInfo;
