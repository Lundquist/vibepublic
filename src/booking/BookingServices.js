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
import { withTranslation } from 'react-i18next';
import SelectDate from './SelectDate'
import SubHeader from './SubHeader'
import { Route, Switch } from 'react-router-dom';


function BookingServices(props) {
    const { t } = props;

      return (
        <div>
            <ReactCSSTransitionGroup
                transitionName="page"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                <Switch>
                    <Route path='/:selectedService/:selectedEmployee/:date/:customerName/confirm-booking' component={PaymentPage} />
                    <Route exact path='/:selectedService/:selectedEmployee/:date/customer-information' component={CustomerInformation} />
                    <Route exact path='/:selectedService/:selectedEmployee/select-booking-time' component={SelectDate} />
                    <Route exact path='/:selectedService/select-employee' component={SelectEmployee} />
                    <Route exact path='/' component={SelectService} />
                </Switch>
            </ReactCSSTransitionGroup>
        </div>
    )

}
export default withTranslation()(withReducer('calendarApp', reducer)(BookingServices));
