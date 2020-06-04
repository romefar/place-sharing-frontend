import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Avatar from '../../../shared/UI-elements/avatar'
import Card from '../../../shared/UI-elements/card'
import './user-item.css'

const UserItem = ({ id, image, name, placeCount }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={`http://localhost:3001/${image}`} alt={name}/>
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {`${placeCount} ${placeCount === 0 ? 'Place' : 'Places'}`}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  )
}

UserItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeCount: PropTypes.number.isRequired
}

export default UserItem
