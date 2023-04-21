import React, { useImperativeHandle, useRef } from 'react';
import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return {
            customFocus: activate
        }
    });

    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )
});

export default Input;