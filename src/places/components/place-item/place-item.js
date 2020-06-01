import React, { useState, Fragment, useContext } from 'react'
import PropTypes from 'prop-types'

import Button from '../../../shared/form-elements/button'
import Card from '../../../shared/UI-elements/card'
import Modal from '../../../shared/UI-elements/modal'
import Map from '../../../shared/UI-elements/map'
import AuthContext from '../../../shared/context/auth-context'

import './place-item.css'

const PlaceItem = ({ id, imageUrl, title, description, address, creatorId, location }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const [showMap, setMapVisibility] = useState(false)
  const [showConfirmModal, setConfirmModalVisibility] = useState(false)

  const showMapHandler = () => setMapVisibility(true)
  const closeMapHandler = () => setMapVisibility(false)

  const showDeleteModalHandler = () => setConfirmModalVisibility(true)
  const closeDeleteModalHandler = () => setConfirmModalVisibility(false)
  const confirmDeleteHandler = () => {
    closeDeleteModalHandler()
    console.log('Deleting')
  }

  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        headerTitle={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footerContent={<Button onClick={closeMapHandler}>Close</Button>}>
        <div className="map-container">
          <Map center={location} zoom={12}/>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={closeDeleteModalHandler}
        headerTitle="Are you sure?"
        footerClass="place-item__modal-actions"
        footerContent={
          <Fragment>
            <Button inverse onClick={closeDeleteModalHandler}>Cancel</Button>
            <Button danger onClick={confirmDeleteHandler}>Delete</Button>
          </Fragment>
        }>
        <p>Do you want to delete this place? Please note that it cannot be undone. </p>
      </Modal>
      <li className="place-item-actions">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={imageUrl} alt={title}/>
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={showMapHandler}>View on map</Button>
            { isLoggedIn && <Button to={`/places/${id}`}>Edit</Button>}
            { isLoggedIn && <Button danger onClick={showDeleteModalHandler}>Delete</Button>}
          </div>
        </Card>
      </li>
    </Fragment>
  )
}

PlaceItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  creatorId: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
}

export default PlaceItem
