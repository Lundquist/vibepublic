import React from 'react';
import * as Actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
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
      $imagePreview = (<img className="userImage" src='https://ca.slack-edge.com/TSVP4QZM3-USJ915H35-6d0088e7a834-512' />);
    }

    return (
      <div className="selectEmployeesButton __flex" key={employee.id} onClick={() => setEmployee(employee)}>
        {$imagePreview}
        <div>{employee.firstName} {employee.lastName}</div>
      </div>
    )
  }

  return (
    <div className="employeesContainer __pagewrapper">
      <h2 className='__header'><i className='material-icons'>arrow_back</i><SubHeader /> Select employee</h2>
      {employees.map(renderEmployees)}
    </div>
  )

}

//                 

export default withReducer('calendarApp', reducer)(SelectEmployee);
