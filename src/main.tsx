import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initAllOptimizations } from './utils/performanceOptimizations'

// Initialiser les optimisations de performance
initAllOptimizations();

createRoot(document.getElementById("root")!).render(<App />);
