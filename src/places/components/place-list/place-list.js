import React from 'react'
import PropTypes from 'prop-types'

import PlaceItem from '../place-item'
import Card from '../../../shared/UI-elements/card'

import './place-list.css'

const NoPlacesFound = () => {
  return (
    <div className="place-list center">
      <Card>
        <h2>No places found. Would you like to create a new one?</h2>
        <button>Share place</button>
      </Card>
    </div>
  )
}

const PlaceList = ({ items }) => {
  if (items.length === 0) {
    return <NoPlacesFound />
  }

  return (
    <ul className="place-list">
      {items.map(({ id, imageUrl, title, description, address, creatorId, location }) => (
        <PlaceItem
          key={id}
          id={id}
          imageUrl={imageUrl}
          title={title}
          description={description}
          address={address}
          creatorId={creatorId}
          location={location}
        />
      )) }
    </ul>
  )
}

PlaceList.propTypes = {
  items: PropTypes.array.isRequired
}

export default PlaceList
