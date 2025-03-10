import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { EventProvider } from './context/EventContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EventProvider>
        <App />
      </EventProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
