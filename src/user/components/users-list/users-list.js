import React from 'react'
import MessageBox from '../../../shared/message-box'
import UserItem from '../user-item'

import './users-list.css'

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return <MessageBox text="No users found." />
  }

  return (
    <ul className="users-list">
      {items.map(user => <UserItem key={user.id} item={user} />)}
    </ul>
  )
}

export default UsersList
