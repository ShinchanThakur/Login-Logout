import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT')
    return { value: action.val, isValid: action.val.includes('@') };
  if (action.type === 'INPUT_BLUR')
    return { value: prevState.value, isValid: prevState.isValid };
  return { value: '', isValid: null };
}

const passwordReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT')
    return { value: action.val, isValid: action.val.trim().length > 6 };
  if (action.type === 'INPUT_BLUR')
    return { value: prevState.value, isValid: prevState.isValid };
  return { value: '', isValid: null };
}

const Login = () => {
  const ctx = useContext(AuthContext);
  //   const [enteredEmail, setEnteredEmail] = useState('');
  //   const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    //We are debouncing here
    const timerPointer = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500)

    return () => {
      //Cleanup function
      clearTimeout(timerPointer);
    }
  }, [emailState.isValid, passwordState.isValid])
  //THIS IS AN OKAY WAY TO USE OTHER STATES TO UPDATE A STATE
  //BECAUSE IT WILL ALWAYS HAVE THE LATEST SNAPSHOT OF THE OTHER STATES
  //(SINCE IT RE-RUNS EVERYTIME A DEPENDENCY(OTHER STATE) CHANGE)

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    //HERE WE ARE DEPENDING ON OTHER STATE TO UPDATE OUR STATE
    //IN RARE CASES (VERY RARE), IT MAY HAPPEN THAT WE HAVE AN OLD/OUTDATED SNAPSHOT OF THE OTHER STATE
    //SINCE REACT SCHEDULES CHANGES
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid)
      ctx.onLogin(emailState.value, passwordState.value);
    else if (!emailState.isValid)
      emailInputRef.current.customFocus();
    else if (!passwordState.isValid)
      passwordInputRef.current.customFocus();
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          label="Email"
          isValid={emailState.isValid}
          htmlFor="email"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          label="Password"
          isValid={passwordState.isValid}
          htmlFor="password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
