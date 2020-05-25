import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './side-drawer.css'

const SideDrawer = props => {
  const sideDrawer = (
    <CSSTransition
      in={props.visible}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  )

  return ReactDOM.createPortal(sideDrawer, document.getElementById('drawer-hook'))
}

export default SideDrawer
