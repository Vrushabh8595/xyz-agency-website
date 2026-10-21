import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { preloadForPath } from './posts/index.js'
import './styles.css'

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

/* Pages are prerendered to static HTML at build time, so hydrate when markup exists (dev server renders fresh). */
preloadForPath(window.location.pathname).then(() => {
  if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app)
  else ReactDOM.createRoot(root).render(app)
})
