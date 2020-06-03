import { useState, useCallback, useRef, useEffect } from 'react'

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  // will not be reinitialized when the function runs again due to using useRef
  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true)

    // a way to abort a fetch request
    const httpAbortController = new AbortController()
    activeHttpRequests.current.push(httpAbortController)
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortController.signal // associate an abort controller with the current request
      })
      const responseData = await response.json()
      activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortController)

      if (!response.ok) {
        throw new Error(responseData.message)
      }
      setIsLoading(false)
      return responseData
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
      throw error
    }
  }, [])

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort()) // cacnel request on unmount by calling abort() method
    }
  }, [])

  return { isLoading, error, sendRequest, clearError }
}

export default useHttpClient
