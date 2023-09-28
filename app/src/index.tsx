import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/reset.css'
import './styles/normolize.css'
import './index.scss'
import Routing from './routes/Routing'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Routing />
  </React.StrictMode>,
)
