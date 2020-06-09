import React, { useState, Fragment, useContext } from 'react'
import PropTypes from 'prop-types'

import Button from '../../../shared/form-elements/button'
import Card from '../../../shared/UI-elements/card'
import Modal from '../../../shared/UI-elements/modal'
import Map from '../../../shared/UI-elements/map'
import AuthContext from '../../../shared/context/auth-context'
import useHttpClient from '../../../shared/hooks/http-hook'
import ErrorModal from '../../../shared/UI-elements/error-modal'
import LoadingSpinner from '../../../shared/UI-elements/loading-spinner'
import httpConfig from '../../../config/http-config'

import './place-item.css'

const PlaceItem = ({ id, image, title, description, address, creatorId, onDelete, location }) => {
  const { userId, token } = useContext(AuthContext)
  const [showMap, setMapVisibility] = useState(false)
  const [showConfirmModal, setConfirmModalVisibility] = useState(false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const showMapHandler = () => setMapVisibility(true)
  const closeMapHandler = () => setMapVisibility(false)

  const showDeleteModalHandler = () => setConfirmModalVisibility(true)
  const closeDeleteModalHandler = () => setConfirmModalVisibility(false)
  const confirmDeleteHandler = async () => {
    closeDeleteModalHandler()
    try {
      await sendRequest(
        `${httpConfig.getDomain()}/api/places/${id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${token}`
        })
      onDelete(id)
    } catch (error) {

    }
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        headerTitle={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footerContent={<Button onClick={closeMapHandler}>Close</Button>}>
        <div className="map-container">
          <Map center={location} zoom={18}/>
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
      {isLoading && <LoadingSpinner asOverlay />}
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={`${httpConfig.getDomain()}/${image}`} alt={title}/>
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={showMapHandler}>View on map</Button>
            { userId === creatorId && <Button to={`/places/${id}`}>Edit</Button>}
            { userId === creatorId && <Button danger onClick={showDeleteModalHandler}>Delete</Button>}
          </div>
        </Card>
      </li>
    </Fragment>
  )
}

PlaceItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  creatorId: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default PlaceItem
