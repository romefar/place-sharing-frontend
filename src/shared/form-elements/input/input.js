import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'

import { validate } from '../../utils/validators'

import './input.css'

const CHANGE_INPUT = 'CHANGE'
const TOUCH_INPUT = 'TOUCH'

const inputReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators)
      }
    case TOUCH_INPUT:
      return {
        ...state,
        isTouched: true
      }
    default:
      return state
  }
}

const Input = ({ id, label, type, placeholder = null, rows, element, validators, errorText = '', onInput, initialValue, initialValid }) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isValid: initialValid || false,
    isTouched: false
  })

  const { value, isValid, isTouched } = inputState

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput])

  const changeHandler = e => {
    dispatch({
      type: CHANGE_INPUT,
      payload: e.target.value,
      validators
    })
  }

  const touchHandler = () => {
    dispatch({
      type: TOUCH_INPUT
    })
  }

  const inputElement = element === 'input'
    ? <input
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={value}
    />
    : <textarea
      id={id}
      rows={rows || 3}
      onChange={changeHandler}
      placeholder={placeholder}
      onBlur={touchHandler}
      value={value}
    />
  return (
    <div className={`form-control ${!isValid && isTouched && 'form-control--invalid'}`}>
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!isValid && isTouched && <p>{errorText}</p>}
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  element: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  validators: PropTypes.array,
  onInput: PropTypes.func,
  initialValue: PropTypes.string,
  initialValid: PropTypes.bool
}

export default Input
