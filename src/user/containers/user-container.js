import React from 'react'
import UsersList from '../components/users-list'

const UserContainer = () => {
  const USERS = [
    {
      id: 'ul1',
      name: 'Mike Smith',
      image: 'https://cdn.pixabay.com/photo/2020/05/24/12/31/architecture-5214047_960_720.jpg',
      placeCount: 0
    },
    {
      id: 'ul2',
      name: 'Jes Van',
      image: 'https://cdn.pixabay.com/photo/2020/05/22/20/58/rocks-5207180_960_720.jpg',
      placeCount: 3
    }
  ]

  return <UsersList items={USERS} />
}

export default UserContainer
