import React from 'react'
import PropTypes from 'prop-types'

import PlaceItem from '../place-item'
import Card from '../../../shared/UI-elements/card'
import Button from '../../../shared/form-elements/button'

import './place-list.css'

const NoPlacesFound = () => {
  return (
    <div className="place-list center">
      <Card>
        <h2>No places found. Would you like to create a new one?</h2>
        <Button to="/places/new">Share place</Button>
      </Card>
    </div>
  )
}

const PlaceList = ({ items, onDelete }) => {
  if (items.length === 0) {
    return <NoPlacesFound />
  }
  return (
    <ul className="place-list">
      {items.map(({ id, image, title, description, address, creatorId, location }) => (
        <PlaceItem
          key={id}
          id={id}
          image={image}
          title={title}
          description={description}
          address={address}
          creatorId={creatorId}
          location={location}
          onDelete={onDelete}
        />
      )) }
    </ul>
  )
}

PlaceList.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default PlaceList
