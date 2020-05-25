import React from 'react'
import { Link } from 'react-router-dom'

import Avatar from '../../../shared/avatar'
import Card from '../../../shared/card'
import './user-item.css'

const UserItem = ({ item: { id, image, name, placeCount } }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name}/>
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

export default UserItem
