import React from 'react'
import PropTypes, { any } from 'prop-types'

import './card.css'

const Card = ({ className, style, children }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  children: any
}

export default Card
