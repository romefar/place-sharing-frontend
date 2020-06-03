import React, { useEffect, useState, useContext, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import MessageBox from '../../../shared/message-box'
import Button from '../../../shared/form-elements/button'
import Input from '../../../shared/form-elements/input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators'
import useForm from '../../../shared/hooks/form-hook'
import useHttpClient from '../../../shared/hooks/http-hook'
import ErrorModal from '../../../shared/UI-elements/error-modal'
import LoadingSpinner from '../../../shared/UI-elements/loading-spinner'
import AuthContext from '../../../shared/context/auth-context'

import './update-place.css'

const UpdatePlace = () => {
  const placeId = useParams().placeId
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedPlace, setLoadedPlace] = useState()
  const history = useHistory()
  const { userId } = useContext(AuthContext)
  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  }, false)

  const placeUpdateSubmitHandler = async e => {
    e.preventDefault()
    try {
      await sendRequest(
        `http://localhost:3001/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json'
        })
      history.push(`/${userId}/places`)
    } catch (error) {

    }
  }

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:3001/api/places/${placeId}`)
        setLoadedPlace(responseData.place)
        setFormData({
          title: {
            value: responseData.place.title,
            isValid: true
          },
          description: {
            value: responseData.place.description,
            isValid: true
          }
        }, true)
      } catch (error) {
      }
    }
    fetchUserPlaces()
  }, [sendRequest, placeId, setFormData])

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!loadedPlace && !error) {
    return <MessageBox text="Couldn't find the place." />
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && <form
        className="place-form"
        onSubmit={placeUpdateSubmitHandler}>
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please provide a valid title."
          onInput={inputHandler}
          initialValue={loadedPlace.title}
          initialValid={true}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
          initialValue={loadedPlace.description}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>Update place</Button>
      </form>}
    </Fragment>
  )
}

export default UpdatePlace
