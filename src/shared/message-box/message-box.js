import React from 'react'

import Card from '../card'

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

export default MessageBox
