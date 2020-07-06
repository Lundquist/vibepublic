import React from 'react';
import './DialogBox.scss';

const DialogBox = ({ title, close, children, className }) => {
    return (
        <div className='__Dialog-Box__wrapper'>
            <div className='__blur' onClick={close}></div>
            <div className={`__card2 ${className}`}>
                <h3 className='__flex __sb'>{title}<i className='material-icons' onClick={close}>close</i></h3>
                <p>{children}</p>
            </div>
        </div>
    )
}

export default DialogBox;