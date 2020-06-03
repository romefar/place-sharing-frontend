import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../modal'
import Button from '../../form-elements/button'

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      headerTitle="An Error Occurred!"
      show={!!props.error}
      footerContent ={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  )
}

ErrorModal.propTypes = {
  onClear: PropTypes.func.isRequired,
  error: PropTypes.any
}

export default ErrorModal
