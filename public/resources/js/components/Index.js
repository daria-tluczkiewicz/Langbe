import React from 'react'
import '../../../resources/css/app.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import App from './App'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('app'))

export default function Index() {
  return (
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  )
}

root.render(<Index />)
