import React, { useEffect, useState, Fragment } from 'react'

import UsersList from '../components/users-list'
import ErrorModal from '../../shared/UI-elements/error-modal'
import LoadingSpinner from '../../shared/UI-elements/loading-spinner'
import useHttpClient from '../../shared/hooks/http-hook'
import httpConfig from '../../config/http-config'

const UserContainer = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`${httpConfig.getDomain()}/api/users`)
        setLoadedUsers(responseData.users)
      } catch (error) {
      }
    }
    fetchUsers()
  }, [sendRequest])

  return (
    <Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <ErrorModal error={error} onClear={clearError}/>
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </Fragment>
  )
}

export default UserContainer
