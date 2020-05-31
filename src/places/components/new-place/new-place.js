import React from 'react'

import Input from '../../../shared/form-elements/input'

import './new-place.css'

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input element='input' type='text' label='Title' />
    </form>
  )
}

export default NewPlace
