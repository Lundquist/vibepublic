import React, { useState } from 'react';
import * as Actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import { useTranslation } from 'react-i18next';
import { getAvailableHours } from '../../api'
import moment from 'moment'
import './style.scss';
import SubHeader from '../SubHeader';
import DialogBox from '../../ui/DialogBox/DialogBox'


function SelectEmployee(props) {
  const dispatch = useDispatch();
  const { employees, selectedService } = useSelector(({ global }) => global.services);
  const { currentPage } = useSelector(({ global }) => global.booking);
  const { t } = useTranslation();
  const [employeeInfo, setEmployeeInfo] = useState(null);


  const selectedEmployee = (employee) => {
    setEmployee(employee);
    const pathname = props.location.pathname.replace('select-employee', `employee='${employee.firstName}-${employee.lastName}'/select-booking-time${props.location.search}`);
    props.history.push(pathname);
  }

  function setEmployee(selectedEmployee) {
    dispatch(Actions.setSelectedEmployee(selectedEmployee))
    dispatch(Actions.goForward(currentPage))
    dispatch(getAvailableHours(selectedEmployee.id, moment(), selectedService.id))

  }

  const goBack = () => dispatch(Actions.goBack(currentPage)); // to tell the store to go back.



  const renderEmployees = (employee) => {
    let $imagePreview = null;

    if (employee.userImage) {
      var buffer = new Buffer(employee.userImage);
      $imagePreview = (<img className="userImage" src={buffer} />);
    } else {
      $imagePreview = (<img className="userImage" src='https://ca.slack-edge.com/TSVP4QZM3-USJ915H35-6d0088e7a834-512' />);
    }

    return (
      <div className="selectEmployeesButton __flex-strech">
        <div key={employee.id} className='__flex __f1' onClick={() => selectedEmployee(employee)}>
          {$imagePreview}
          <div className='__flex __user-info __sb'>
            {employee.firstName} {employee.lastName}
          </div>
        </div>
        <i className='material-icons' onClick={() => setEmployeeInfo(employee)}>info</i>
      </div>
    )
  }

  return (
    <div className="__employees">
      {employeeInfo && <PopUpInfo employee={employeeInfo} close={() => setEmployeeInfo(null)} click={(employee) => selectedEmployee(employee)} />}
      <h2 className='__header'><i className='material-icons' onClick={goBack}>arrow_back</i><SubHeader /> Select employee</h2>
      <div className='__card2'>
        {employees.map(renderEmployees)}
        {employees.map(renderEmployees)}
      </div>
    </div>
  )

}

const PopUpInfo = ({ employee, close, click }) => (
  <DialogBox className='__popup' title={`${employee.firstName} ${employee.lastName}`} close={close}>
    {console.log(employee)}
    {employee.description}
    <button className='__btn' onClick={() => click(employee)}>Book</button>
  </DialogBox>
)

//                 

export default withReducer('calendarApp', reducer)(SelectEmployee);