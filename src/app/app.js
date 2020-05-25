import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import UserContainer from '../user/containers/user-container'
import MainNavigation from '../shared/navigation/main-navigation'

import './app.css'

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" render={() => <h2>Welcome home//-//</h2>} exact/>
          <Route path="/users" component={UserContainer} exact/>
          <Route render={() => <h1>404 page was not found</h1>} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
