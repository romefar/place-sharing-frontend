import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import './backdrop.css'

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  )
}

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Backdrop
