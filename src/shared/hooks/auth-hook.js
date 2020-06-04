import { useState, useEffect, useCallback } from 'react'

let logoutTimer

const useAuth = () => {
  const [token, setToken] = useState(false)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const [userId, setUserId] = useState(false)

  const login = useCallback((userId, token, expirationDate) => {
    setToken(token)
    const tokenExpirationTime = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setTokenExpirationDate(tokenExpirationTime)
    localStorage.setItem('userData', JSON.stringify({ userId, token, expiration: tokenExpirationTime.toISOString() }))
    setUserId(userId)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('userData')
    setTokenExpirationDate(null)
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  }, [login])

  return {
    token,
    login,
    logout,
    userId
  }
}

export default useAuth
