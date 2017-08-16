import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Rota from './Rota'
import CommitsList from './CommitsList'
import Principal from './Principal'

const Main = () => (
    <Switch>
      <Route path='/:name' component={CommitsList}/>
    </Switch>
)

export default Main
