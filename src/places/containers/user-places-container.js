import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/place-list'

const PLACES = [
  {
    id: 'u1',
    title: 'Emprie State Building',
    description: 'The most famouse place in the world',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/280px-Empire_State_Building_from_the_Top_of_the_Rock.jpg',
    address: '20 W 34th St, New York, NY 10001, USA',
    location: {
      lat: 40.7484445,
      lng: -73.9878531
    },
    creatorId: 'ul1'
  },
  {
    id: 'u2',
    title: 'Emprie State Building',
    description: 'The most famouse place in the world',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/280px-Empire_State_Building_from_the_Top_of_the_Rock.jpg',
    address: '20 W 34th St, New York, NY 10001, USA',
    location: {
      lat: 40.7484445,
      lng: -73.9878531
    },
    creatorId: 'ul2'
  }
]

const UserPlacesContainer = () => {
  const userId = useParams().userId
  const usersPlaces = PLACES.filter(place => place.creatorId === userId)
  return <PlaceList items={usersPlaces} />
}

export default UserPlacesContainer
