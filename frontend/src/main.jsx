import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "@/components/ui/toaster"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container mx-auto">
      <App />
    </div>
    <Toaster />
  </StrictMode>,
)
