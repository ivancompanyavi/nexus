import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { AnimatePresence } from 'framer-motion'

import { Menu } from './common'
import { Blog, Gaming, Main, CityBuilder } from './pages'

import client from './client'

import './App.css'

const customHistory = createBrowserHistory()

function App() {
  return (
    <ApolloProvider client={client}>
      <Router history={customHistory}>
        <Menu />
        <AnimatePresence exitBeforeEnter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/gaming" component={Gaming} />
            <Route path="/blog" component={Blog} />) />
            <Route path="/citybuilder" component={CityBuilder} />) />
          </Switch>
        </AnimatePresence>
      </Router>
    </ApolloProvider>
  )
}

export default App
