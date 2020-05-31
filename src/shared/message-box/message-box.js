import React from 'react'
import PropTypes from 'prop-types'

import Card from '../UI-elements/card'

import './message-box.css'

const MessageBox = ({ text }) => {
  return (
    <div className="message-box-container" >
      <Card>
        <h2 className="message-box-container__text">{ text }</h2>
      </Card>
    </div>
  )
}

MessageBox.propTypes = {
  text: PropTypes.string.isRequired
}

export default MessageBox
