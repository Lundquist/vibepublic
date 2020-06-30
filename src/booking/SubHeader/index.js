import React, { useEffect } from 'react';
import './style.scss';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import * as Actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

function SubHeader(props) {
    const dispatch = useDispatch();
    const { currentPage } = useSelector(({ global }) => global.booking);
    const { t } = useTranslation();

    const goBack = () => {

        switch (currentPage){
            case 2:{
                dispatch(Actions.setSelectedService(0))
                break;
            }
            case 3:{
                dispatch(Actions.setSelectedEmployee({
                    id: 0,
                    firstName: "",
                    lastName: ""
                }))
                break;
            }
            case 4:{
                dispatch(Actions.setSelectedTime(moment()))
                break;
            }
            default:{
                break;
            }
        }
        dispatch(Actions.goBack(currentPage))

    }

    return (
        currentPage > 1 ? <div id="goBackDiv" onClick={() => goBack()} /> : <div id="goBackDiv noBorder"/>
        )
}

export default withReducer('calendarApp', reducer)(SubHeader);
