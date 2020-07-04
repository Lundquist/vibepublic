import React, { useEffect } from 'react';
import './Toast.scss';

const Toast = ({ message, hideToast }) => {

    useEffect(() => {
        const removeToast = setTimeout(() => {
            hideToast();
        }, 2500)
        return () => {
            clearTimeout(removeToast);
        }
    }, []);

    return (
        <div className='__toast'>
            {message}
        </div>
    )
}

export default Toast;