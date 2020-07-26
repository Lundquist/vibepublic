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
  console.log("SelectEmployee " + JSON.stringify(employees))
  const goBack = () => {
    dispatch(Actions.goBack(currentPage))
    props.history.goBack();
  }; // to tell the store to go back.



  const renderEmployees = (employee) => {

    let $imagePreview = (<img className="userImage" src={config.serverUrl + '/public/uploads/userImage/' + employee.id + '.png'} onError={(e) => addDefaultSrc(e)} />);
    const addDefaultSrc = (ev) => {
        ev.target.src = "https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
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
    <button className='__btn' onClick={() => click(employee)}>Book</button>
  </DialogBox>
)

//                 
export default withTranslation()(withReducer('calendarApp', reducer)(SelectEmployee));