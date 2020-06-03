import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import UserContainer from '../user/containers/user-container'
import MainNavigation from '../shared/navigation/main-navigation'
import UserPlacesContainer from '../places/containers/user-places-container'
import SignUpContainer from '../authorization/containers/sign-up-container'
import NewPlace from '../places/components/new-place'
import UpdatePlace from '../places/components/update-place'
import AuthContext from '../shared/context/auth-context'

import './app.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback((userId) => {
    setIsLoggedIn(true)
    setUserId(userId)
  }, [])
  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  }, [])

  let routes = null
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" component={UserContainer} exact/>
        <Route path="/:userId/places" component={UserPlacesContainer} exact />
        <Route path="/places/new" component={NewPlace} exact />
        <Route path="/places/:placeId" component={UpdatePlace} exact />
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" component={UserContainer} exact/>
        <Route path="/:userId/places" component={UserPlacesContainer} exact />
        <Route path="/auth" component={SignUpContainer} exact />
        <Redirect to="/auth" />
      </Switch>
    )
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
