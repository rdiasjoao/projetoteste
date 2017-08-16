import React from 'react'
import Principal from './Principal'
import Main from './Main'

const App = () => (
  <div>
    <div className="container-fluid">
    <div className="row blue-background">
    <div className="col-xs-6 blue-background">
    <Principal />
    </div>
    <div className="col-xs-6 white-background">
    <Main />
    </div>
    </div>
    </div>
  </div>
)

export default App
