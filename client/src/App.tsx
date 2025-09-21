import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Swipe from './pages/Swipe'
import Questionnaire from './pages/Questionnaire'
import Error from './pages/Error'
import Tinder from './pages/Tinder'
import Favourites from './pages/Favourites'
import Details from './pages/Details'
import Home from './pages/Home'
import './App.css'


async function loadPreline() {
  return import('preline/dist/index.js');
}

function PrelineInitializer() {
  const location = useLocation();

  useEffect(() => {
    const initPreline = async () => {
      await loadPreline();

      if (
        window.HSStaticMethods &&
        typeof window.HSStaticMethods.autoInit === 'function'
      ) {
        window.HSStaticMethods.autoInit();
      }
    };

    initPreline();
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <PrelineInitializer />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/swipe" element={<Swipe />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/tinder" element={<Tinder />} />
        <Route path="/details/:id" element={<Details />} />

      </Routes>
    </Router>
  )
}

export default App
