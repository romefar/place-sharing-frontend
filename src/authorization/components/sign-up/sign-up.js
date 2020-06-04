import React, { useState, useContext, Fragment } from 'react'

import Input from '../../../shared/form-elements/input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../../shared/utils/validators'
import Button from '../../../shared/form-elements/button'
import useForm from '../../../shared/hooks/form-hook'
import useHttpClient from '../../../shared/hooks/http-hook'
import Card from '../../../shared/UI-elements/card'
import AuthContext from '../../../shared/context/auth-context'
import ErrorModal from '../../../shared/UI-elements/error-modal'
import LoadingSpinner from '../../../shared/UI-elements/loading-spinner'
import ImageUpload from '../../../shared/form-elements/image-upload'

import './sign-up.css'

const SignUpForm = () => {
  const [isLoginMode, setLoginMode] = useState(true)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
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

  const signupSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (!isLoginMode) {
        const formData = new FormData()
        const { name, email, password, image } = formState.inputs
        formData.append('name', name.value)
        formData.append('email', email.value)
        formData.append('password', password.value)
        formData.append('image', image.value)
        const { userId, token } = await sendRequest(
          'http://localhost:3001/api/users/signup',
          'POST',
          formData)
        login(userId, token)
      } else {
        const { email, password } = formState.inputs
        const { userId, token } = await sendRequest(
          'http://localhost:3001/api/users/login',
          'POST',
          JSON.stringify({
            email: email.value,
            password: password.value
          }),
          {
            'Content-Type': 'application/json'
          })
        login(userId, token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined,
        image: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        },
        image: {
          value: null,
          isValid: false
        }
      }, false)
    }
    setLoginMode(prevMode => !prevMode)
  }

  return (
    <Fragment>
      {error && <ErrorModal error={error} onClear={clearError}/>}
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login required</h2>
        <form className="sign-up-form" onSubmit={signupSubmitHandler}>
          {!isLoginMode && <Input id='name' element='input' type='text' label='Name' validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name." onInput={inputHandler}/>}
          <Input
            id='email'
            element='input'
            type='text'
            label='Email'
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please provide a valid email."
            onInput={inputHandler}
          />
          {!isLoginMode && <ImageUpload id='image' errorText="Please provide an image." center onInput={inputHandler}/>}
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
        <Button inverse onClick={switchModeHandler}>Swith to {isLoginMode ? 'Sign up' : 'Login'}</Button>
      </Card>
    </Fragment>
  )
}

export default SignUpForm
