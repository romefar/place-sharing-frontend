import React from 'react'
import PropTypes from 'prop-types'

import MessageBox from '../../../shared/message-box'
import UserItem from '../user-item'

import './users-list.css'

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return <MessageBox text="No users found." />
  }

  return (
    <ul className="users-list">
      {items.map(({ id, image, name, placeCount }) => {
        return <UserItem key={id}
          id={id}
          image={image}
          name={name}
          placeCount={placeCount}
        />
      })}
    </ul>
  )
}

UsersList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
}

export default UsersList
