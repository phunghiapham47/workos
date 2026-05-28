import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { WorkOSProvider } from './state/workosStore.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkOSProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WorkOSProvider>
  </StrictMode>,
)
