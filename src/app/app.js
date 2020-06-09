import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import UserContainer from '../user/containers/user-container'
import UserPlacesContainer from '../places/containers/user-places-container'
import SignUpContainer from '../authorization/containers/sign-up-container'
import Footer from '../shared/footer'
import MainNavigation from '../shared/navigation/main-navigation'
import NewPlace from '../places/components/new-place'
import UpdatePlace from '../places/components/update-place'
import AuthContext from '../shared/context/auth-context'
import useAuth from '../shared/hooks/auth-hook'

import './app.css'

const App = () => {
  let routes = null
  const { token, login, logout, userId } = useAuth()
  if (token) {
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
    <AuthContext.Provider value={{ isLoggedIn: !!token, login, logout, userId, token }}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
