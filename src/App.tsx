import React, { FC } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Container from '@/pages/public/container'
import Login from '@/pages/public/login'

const App: FC = () => (
  <Router>
    <Route exact path="/login" component={Login} />
    <Route
      path="/"
      key="container"
      render={(props: unknown) => <Container {...props} />}
    />
  </Router>
)

export default App
