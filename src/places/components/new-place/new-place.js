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
import ImageUpload from '../../../shared/form-elements/image-upload'

import './new-place.css'

const NewPlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const { token } = useContext(AuthContext)
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
    },
    image: {
      value: null,
      isValid: false
    }
  })

  const placeSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const { title, description, address, image } = formState.inputs
      const formData = new FormData()
      formData.append('title', title.value)
      formData.append('description', description.value)
      formData.append('address', address.value)
      formData.append('image', image.value)
      await sendRequest(
        'http://localhost:3001/api/places',
        'POST',
        formData,
        {
          Authorization: `Bearer ${token}`
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
        <ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image."/>
        <Button type="submit" disabled={!formState.isValid}>Add place</Button>
      </form>
    </Fragment>
  )
}

export default NewPlace
