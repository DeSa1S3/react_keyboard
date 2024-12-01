import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../preprocessor/index.sass'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App/>
)
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
