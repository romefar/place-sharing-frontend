import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/auth-context'

import './nav-links.css'

const NavLinks = () => {
  const { isLoggedIn, logout } = useContext(AuthContext)
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>All users</NavLink>
      </li>
      {
        isLoggedIn && <li>
          <NavLink to="/ul2/places">My places</NavLink>
        </li>
      }
      {
        isLoggedIn && <li>
          <NavLink to="/places/new">Add place</NavLink>
        </li>
      }
      {
        !isLoggedIn && <li>
          <NavLink to="/auth">Auth</NavLink>
        </li>
      }
      {
        isLoggedIn && <li>
          <button onClick={logout} to="/auth">Logout</button>
        </li>
      }
    </ul>
  )
}

export default NavLinks
