import React from 'react'
import PropTypes from 'prop-types'

import './input.css'

const Input = ({ id, label, type, placeholder, rows, element }) => {
  const inputElement = element === 'input'
    ? <input
      id={id}
      type={type}
      placeholder={placeholder}
    />
    : <textarea
      id={id}
      rows={rows || 3}/>
  return (
    <div className={'form-control'}>
      <label htmlFor={id}>{label}</label>
      {inputElement}
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  rows: PropTypes.number,
  element: PropTypes.string.isRequired
}

export default Input
