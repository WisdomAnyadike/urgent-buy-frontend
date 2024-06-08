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
import { Store, persistor } from './Components/Redux/Store.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import 'aos/dist/aos.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={Store}> 
  <PersistGate loading={null} persistor={persistor}> 
  <BrowserRouter>
          <App />
    </BrowserRouter>
  </PersistGate>
  
    </Provider>

  </React.StrictMode>,
)
