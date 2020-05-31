import React from 'react'
import PropTypes from 'prop-types'

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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.string])
}

export default Card
