import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { CSSTransition } from 'react-transition-group'

import './side-drawer.css'

const SideDrawer = ({ visible, onClick, children }) => {
  const sideDrawer = (
    <CSSTransition
      in={visible}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>{children}</aside>
    </CSSTransition>
  )

  return ReactDOM.createPortal(sideDrawer, document.getElementById('drawer-hook'))
}

SideDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SideDrawer
