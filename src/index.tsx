import App from './App'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app-root') as HTMLElement

const root = createRoot(container) //Not yet supported
root.render(<App />)
