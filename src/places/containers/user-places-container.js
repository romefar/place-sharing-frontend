import React, { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/place-list'
import useHttpClient from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UI-elements/error-modal'
import LoadingSpinner from '../../shared/UI-elements/loading-spinner'

const UserPlacesContainer = () => {
  const userId = useParams().userId
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedPlaces, setLoadedPlaces] = useState()

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:3001/api/places/user/${userId}`)
        setLoadedPlaces(responseData.places)
      } catch (error) {
      }
    }
    fetchUserPlaces()
  }, [sendRequest, userId])

  const onDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDelete={onDeleteHandler} />}
    </Fragment>
  )
}

export default UserPlacesContainer
