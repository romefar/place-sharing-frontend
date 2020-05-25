import React from 'react'

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

export default Avatar
