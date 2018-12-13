import React from 'react'
import ReactDOM from 'react-dom'

import Login from './containers/login/login'
import Main from './containers/main/main'
import Register from './containers/register/register'

import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'
import './assets/css/index.less'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route component={Main}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>)
  , document.getElementById('root'))