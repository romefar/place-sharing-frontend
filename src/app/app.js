import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import UserContainer from '../user/containers/user-container'
import MainNavigation from '../shared/navigation/main-navigation'
import UserPlacesContainer from '../places/containers/user-places-container'
import NewPlace from '../places/components/new-place'

import './app.css'

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" component={UserContainer} exact/>
          <Route path="/:userId/places" component={UserPlacesContainer} exact />
          <Route path="/places/new" component={NewPlace} exact />
          <Route render={() => <h1>404 page was not found</h1>} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
