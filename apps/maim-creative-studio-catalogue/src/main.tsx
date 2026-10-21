import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const mode = import.meta.env.VITE_CATALOGUE_MODE === 'fixture' ? 'fixture' : 'live'
createRoot(document.getElementById('root')!).render(
  <StrictMode><App mode={mode} sessionProvider={window.__MAIM_STUDIO_SESSION__} /></StrictMode>
)
