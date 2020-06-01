import React, { useState, useContext } from 'react'

import Input from '../../../shared/form-elements/input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../../shared/utils/validators'
import Button from '../../../shared/form-elements/button'
import useForm from '../../../shared/hooks/form-hook'
import Card from '../../../shared/UI-elements/card'
import AuthContext from '../../../shared/context/auth-context'

import './sign-up.css'

const SignUpForm = () => {
  const [isLoginMode, setLoginMode] = useState(true)
  const { login } = useContext(AuthContext)
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  })

  const signupSubmitHandler = e => {
    e.preventDefault()
    login()
  }

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        }
      }, false)
    }
    setLoginMode(prevMode => !prevMode)
  }

  return (
    <Card className="authentication">
      <h2>Login required</h2>
      <form className="sign-up-form" onSubmit={signupSubmitHandler}>
        {!isLoginMode && <Input id='username' element='input' type='text' label='Name' validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name." onInput={inputHandler}/>}
        <Input
          id='email'
          element='input'
          type='text'
          label='Email'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please provide a valid email."
          onInput={inputHandler}
        />
        <Input
          id='password'
          element='input'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(7)]}
          errorText="Please enter a password (at least 7 characters)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'Login' : 'Sign up'}</Button>
      </form>
      <Button inverse onClick={switchModeHandler}>Swith to {isLoginMode ? 'Login' : 'Sign up'}</Button>
    </Card>
  )
}

export default SignUpForm
