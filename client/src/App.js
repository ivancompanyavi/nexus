import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'

import client from './client'
import Gaming from './gaming'

const customHistory = createBrowserHistory()

function App() {
  return (
    <ApolloProvider client={client}>
      <Router history={customHistory}>
        <Route path="/gaming" component={Gaming} />
      </Router>
    </ApolloProvider>
  )
}

export default App
