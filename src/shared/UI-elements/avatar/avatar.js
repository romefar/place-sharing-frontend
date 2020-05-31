import React from 'react'
import PropTypes from 'prop-types'

import './avatar.css'

const Avatar = ({ className, style, image, alt, width }) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img
        src={image}
        alt={alt}
        style={{ width, height: width }}
      />
    </div>
  )
}

Avatar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string
}

export default Avatar
