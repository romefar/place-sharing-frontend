import React, { useContext, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import Input from '../../../shared/form-elements/input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators'
import Button from '../../../shared/form-elements/button'
import useForm from '../../../shared/hooks/form-hook'
import useHttpClient from '../../../shared/hooks/http-hook'
import AuthContext from '../../../shared/context/auth-context'
import ErrorModal from '../../../shared/UI-elements/error-modal'
import LoadingSpinner from '../../../shared/UI-elements/loading-spinner'

import './new-place.css'

const NewPlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { userId } = useContext(AuthContext)
  const history = useHistory()
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    }
  })

  const placeSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const { title, description, address } = formState.inputs
      await sendRequest(
        'http://localhost:3001/api/places',
        'POST',
        JSON.stringify({
          title: title.value,
          description: description.value,
          address: address.value,
          creatorId: userId
        }),
        {
          'Content-Type': 'application/json'
        }
      )
      history.push('/')
    } catch (error) {

    }
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please provide a valid title."
          onInput={inputHandler}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id='address'
          element='input'
          label='Address'
          type='text'
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>Add place</Button>
      </form>
    </Fragment>
  )
}

export default NewPlace
