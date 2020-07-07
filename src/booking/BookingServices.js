import React, { useState } from 'react';
import './styles/bookingServices.scss';
import SelectEmployee from './SelectEmployee/SelectEmployee'
import SelectService from './SelectService'
import CustomerInformation from './CustomerInformation'
import PaymentPage from './PaymentPage'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as Actions from '../store/actions';
import { useSelector } from 'react-redux';
import withReducer from '../store/withReducer';
import reducer from '../store/reducers';
import * as moment from 'moment'
import { useTranslation } from 'react-i18next';
import SelectDate from './SelectDate'
import SubHeader from './SubHeader'
import { Route, Switch } from 'react-router-dom';


function BookingServices(props) {
    const { currentPage } = useSelector(({ global }) => global.booking);

    const [selectedService, setSelectedService] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(0);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [selectedTime, setSelectedTime] = useState(0);
    const { t } = useTranslation();

    async function submit(name, phone) {
        var newReservation = {
            start: selectedTime,
            end: moment(selectedTime).add(selectedService.time, 'minutes').format('YYYY-MM-DD HH:mm'),
            employee: selectedEmployee,
            service: JSON.stringify(selectedService),
            customer: JSON.stringify({ name: name, phone: phone })
        }
        const response = await Actions.addReservation(newReservation);
        checkError(response)
    }

    function checkError(response) {
        console.log("checkError " + JSON.stringify(response))

        if (response) {
            alert("You have made a reservation at " + selectedTime + " for " + selectedService.name)
        } else {
            alert("Something went wrong. Please try again")
        }

        setSelectedService("")
        setSelectedEmployee(0)
        setSelectedDate(new Date())
        setSelectedTime(0)
    }


    function renderPage() {
        switch (currentPage) {
            case 1:
                return (<SelectService key={1} />);
            case 2:
                return (<SelectEmployee key={2} />);
            case 3:
                return (<SelectDate key={3} />);
            case 4:
                return <CustomerInformation key={4} />
            case 5:
                return (<PaymentPage key={5} submit={(name, phone) => submit(name, phone)} />);
            default:
                return (<SelectService />)
        }
    }
    return (
        <div>
            <ReactCSSTransitionGroup
                transitionName="page"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                <Switch>
                    {/* <Route path='/booking/:selectedService/:selectedEmployee/:date/customer-info' component={PaymentPage} /> */}
                    <Route path='/booking/:selectedService/:selectedEmployee/:date/customer-information' component={CustomerInformation} />
                    <Route path='/booking/:selectedService/:selectedEmployee/select-booking-time' component={SelectDate} />
                    <Route path='/booking/:selectedService/select-employee' component={SelectEmployee} />
                    <Route exact path='/booking' component={SelectService} />
                </Switch>
            </ReactCSSTransitionGroup>
        </div>
    )

}
export default withReducer('calendarApp', reducer)(BookingServices);
