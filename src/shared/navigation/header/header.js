import React from 'react'

import './header.css'

const Header = ({ children }) => {
  return (
    <header className="main-header">
      {children}
    </header>
  )
}

export default Header
