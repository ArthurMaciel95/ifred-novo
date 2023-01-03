import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AppContextProvider } from './context/useContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>

)
