import React from 'react';
import * as Actions from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'store/withReducer';
import reducer from 'store/reducers';
import { useTranslation } from 'react-i18next';
import { getAvailableHours } from '../../api'
import moment from 'moment'
import './style.scss';
import SubHeader from '../SubHeader'


function SelectEmployee(props) {
  const dispatch = useDispatch();
  const { employees, selectedService } = useSelector(({ global }) => global.services);
  const { currentPage } = useSelector(({ global }) => global.booking);
  const { t } = useTranslation();

  function setEmployee(selectedEmployee) {
    dispatch(Actions.setSelectedEmployee(selectedEmployee))
    dispatch(Actions.goForward(currentPage))
    dispatch(getAvailableHours(selectedEmployee.id, moment(), selectedService.id))

  }


  

  const renderEmployees = (employee) => {
    let $imagePreview = null;

    if (employee.userImage) {
      var buffer = new Buffer(employee.userImage);
      $imagePreview = (<img className="userImage" src={buffer} />);
    } else {
      $imagePreview = (<img className="userImage" />);
    }

    return (
      <div className="selectEmployeesButton" key={employee.id} onClick={() => setEmployee(employee)}>
        {$imagePreview}
        <div id="employeeName">
          {employee.firstName} {employee.lastName}
        </div>

      </div>
    )
  }

  return (
    <div className="employeesContainer">
      <div className="employeeHeader"> <SubHeader /> Select employee</div>
      <div id="employeeContent">
        {employees.map(renderEmployees)}
      </div>
    </div>
  )

}

//                 

export default withReducer('calendarApp', reducer)(SelectEmployee);
