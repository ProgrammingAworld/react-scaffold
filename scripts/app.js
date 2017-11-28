/**
 * Created by Anchao on 2016/6/29.
 */
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import ValidatorView from './components/views/components/ValidatorView'

const rootEl = document.getElementById('root')
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  )

render(ValidatorView)
if (module.hot) module.hot.accept('./components/views/components/ValidatorView', () => render(ValidatorView))

// 模块js
// import Main from './main'
//
// new Main()
//   .init()
