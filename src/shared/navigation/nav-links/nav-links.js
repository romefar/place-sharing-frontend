import React from 'react'
import { NavLink } from 'react-router-dom'

import './nav-links.css'

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>All users</NavLink>
      </li>
      <li>
        <NavLink to="/id/places">My places</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">Add place</NavLink>
      </li>
      <li>
        <NavLink to="/signin">Auth</NavLink>
      </li>
    </ul>
  )
}

export default NavLinks
