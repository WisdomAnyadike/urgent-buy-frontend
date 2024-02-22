import React from 'react'
import ReactDOM from 'react-dom/client'


import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'


import 'jquery/dist/jquery.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.scss'
import { Provider } from 'react-redux'
import { Store } from './Components/Redux/Store.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={Store}> 
    <BrowserRouter>
          <App />
    </BrowserRouter>
    </Provider>

  </React.StrictMode>,
)
