import React from 'react'
import PropTypes from 'prop-types'

import MessageBox from '../../../shared/message-box'
import UserItem from '../user-item'

import './users-list.css'

const UsersList = ({ items }) => {
  if (!items || items.length === 0) {
    return <MessageBox text="No users found." />
  }

  return (
    <ul className="users-list">
      {items.map(({ id, image, name, places }) => {
        return <UserItem key={id}
          id={id}
          image={image}
          name={name}
          placeCount={places.length}
        />
      })}
    </ul>
  )
}

UsersList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
}

export default UsersList
