import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ReposList from './ReposList'
import CommitsList from './CommitsList'

const Rota = () => (
  <Switch>
    <Route exact path=':name' component={CommitsList}/>
  </Switch>
)


export default Rota
