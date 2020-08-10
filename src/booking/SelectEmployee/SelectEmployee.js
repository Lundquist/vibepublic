import React, { useState } from 'react';
import * as Actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
//import { useTranslation } from 'react-i18next';
import { getAvailableHours } from '../../api'
import moment from 'moment'
import './style.scss';
import SubHeader from '../SubHeader';
import DialogBox from '../../ui/DialogBox/DialogBox'
import { withTranslation } from 'react-i18next';
import config from '../../config'

function SelectEmployee(props) {
  const dispatch = useDispatch();
  const { employees, selectedService } = useSelector(({ global }) => global.services);
  const { currentPage } = useSelector(({ global }) => global.booking);
  const { t } = props;
  const [employeeInfo, setEmployeeInfo] = useState(null);
  
  const params = new URLSearchParams(window.location.search);
  const companyId = params.get('companyId');
  if(selectedService.id === 0)
      props.history.push('/?companyId=' + companyId)

  const selectedEmployee = (employee) => {
    setEmployee(employee);
    const pathname = props.location.pathname.replace('select-employee', `employee='${employee.firstName}-${employee.lastName}'/select-booking-time${props.location.search}`);
    props.history.push(pathname);
  }

  function setEmployee(selectedEmployee) {
    dispatch(Actions.setSelectedEmployee(selectedEmployee))
    dispatch(Actions.goForward(currentPage))
    dispatch(getAvailableHours(selectedEmployee.id, moment(), selectedService.time))

  }
  const goBack = () => {
    dispatch(Actions.goBack(currentPage))
    props.history.goBack();
    dispatch(Actions.setSelectedService(0))
  }; // to tell the store to go back.



  const renderEmployees = (employee) => {

    let $imagePreview = (<img className="userImage" src={'https://vibeemployeeimage.s3.eu-west-3.amazonaws.com/' + employee.userImage} onError={(e) => addDefaultSrc(e)} />);
    const addDefaultSrc = (ev) => {
        ev.target.src = ".profile.png"
    }

    return (
      <div className="selectEmployeesButton __flex-strech">
        <div key={employee.id} className='__flex __f1' onClick={() => selectedEmployee(employee)}>
          {$imagePreview}
          <div className='__flex __user-info __sb'>
            {employee.firstName} {employee.lastName}
          </div>
        </div>
        {employee.note ? <i className='material-icons' onClick={() => setEmployeeInfo(employee)}>info</i> : null}
      </div>
    )
  }

  return (
    <div className="__employees">
      {employeeInfo && <PopUpInfo employee={employeeInfo} close={() => setEmployeeInfo(null)} click={(employee) => selectedEmployee(employee)} />}
      <h2 className='__header'><i className='material-icons' onClick={goBack}>arrow_back</i><SubHeader /> {t('selectEmployee')}</h2>
      <div className='__card2'>
        {employees.map(renderEmployees)}
      </div>
    </div>
  )

}

const PopUpInfo = ({ employee, close, click }) => (
  <DialogBox className='__popup' title={`${employee.firstName} ${employee.lastName}`} close={close}>
    {console.log(employee)}
    {employee.note}
  </DialogBox>
)

//                 
export default withTranslation()(withReducer('calendarApp', reducer)(SelectEmployee));