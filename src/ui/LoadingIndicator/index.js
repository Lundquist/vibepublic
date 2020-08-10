import React from 'react';
import './style.scss'

const LockableArea = (props) => {
    const { active } = props

    const handleClick = (e) => {
        if (active) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    const render = () => {
        return (
            props.active === true ? <div className="lockableArea"  onClickCapture={handleClick}>
            <div className="lds-dual-ring">
            </div>
            {props.children}
        </div> : null
        )
    }

    return (
        render()
    )


}

export default LockableArea;
