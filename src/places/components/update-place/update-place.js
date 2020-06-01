import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MessageBox from '../../../shared/message-box'
import Button from '../../../shared/form-elements/button'
import Input from '../../../shared/form-elements/input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators'
import useForm from '../../../shared/hooks/form-hook'

import './update-place.css'

const PLACES = [
  {
    id: 'u1',
    title: 'Emprie State Building',
    description: 'The most famouse place in the world',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/280px-Empire_State_Building_from_the_Top_of_the_Rock.jpg',
    address: '20 W 34th St, New York, NY 10001, USA',
    location: {
      lat: 40.7484445,
      lng: -73.9878531
    },
    creatorId: 'ul1'
  },
  {
    id: 'u2',
    title: 'Emprie State Building 222',
    description: 'The most famouse place in the world',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/280px-Empire_State_Building_from_the_Top_of_the_Rock.jpg',
    address: '20 W 34th St, New York, NY 10001, USA',
    location: {
      lat: 40.7484445,
      lng: -73.9878531
    },
    creatorId: 'ul2'
  }
]

const UpdatePlace = () => {
  const placeId = useParams().placeId
  const [isLoading, setLoading] = useState(true)

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

  const placeUpdateSubmitHandler = e => {
    e.preventDefault()
  }
  const place = PLACES.find(place => place.id === placeId)

  useEffect(() => {
    if (place) {
      setFormData({
        title: {
          value: place.title,
          isValid: true
        },
        description: {
          value: place.description,
          isValid: true
        }
      }, true)
    }

    setLoading(false)
  }, [setFormData, place])

  if (!place) {
    return <MessageBox text="Couldn't find the place." />
  }

  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  const { title, description } = formState.inputs

  return (
    <form
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
        initialValue={title.value}
        initialValid={title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={description.value}
        initialValid={description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>Update place</Button>
    </form>
  )
}

export default UpdatePlace
