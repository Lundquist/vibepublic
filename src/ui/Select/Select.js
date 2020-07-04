import React, { useState, Children, useRef } from 'react';
import './Select.scss';

const Select = props => {
    const [selectedValueIndex, setSelectedValueIndex] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const childs = Children.toArray(props.children);
    const { children, value } = childs[selectedValueIndex].props;

    const inputRef = useRef()

    const onSelect = index => {
        setSelectedValueIndex(index);
        setShowMenu('');
        props.onSelect && props.onSelect(inputRef.current);
    }

    const menuHandler = () => {
        setShowMenu(!showMenu);
    }

    const closeMenu = () => {
        setShowMenu(false);
    }
    return (
        <div className='__input-container'>
            <input type='hidden' value={value} />
            <button type='button' className='__selected __flex __sb' onBlur={closeMenu} value={value} onClick={menuHandler} ref={inputRef}>
                {children}
                <i className='material-icons'>arrow_drop_down</i>
            </button>
            <button type='button' className={`${showMenu ? '__menu' : ''} __card2`}>
                {childs.map((child, index) => (
                    <div
                        onClick={() => onSelect(index)}
                        className={`
                            __flex __sb __menu-item 
                            ${selectedValueIndex === index ? '__active' : ''}
                        `}
                        key={index}
                    >
                        {child.props.children}
                        <i className='material-icons'>check</i>
                    </div>
                )
                )}
            </button>
        </div>
    )
}

export default Select;