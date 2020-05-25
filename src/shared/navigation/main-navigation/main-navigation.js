import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../header'
import NavLinks from '../nav-links'
import SideDrawer from '../side-drawer'
import Backdrop from '../../backdrop'

import './main-navigation.css'

const MainNavigation = () => {
  const [isDrawerVisible, setDrawerVisibility] = useState(false)

  const showDrawerHandler = () => {
    setDrawerVisibility(true)
  }

  const closeDrawerHandler = () => {
    setDrawerVisibility(false)
  }

  return (
    <Fragment>
      { isDrawerVisible && <Backdrop onClick={closeDrawerHandler}/> }
      <SideDrawer visible={isDrawerVisible} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <Header>
        <button
          className="main-navigation__menu-btn"
          onClick={showDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </Header>
    </Fragment>
  )
}

export default MainNavigation
