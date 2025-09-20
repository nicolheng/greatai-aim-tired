import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Questionnaire from './pages/Questionnaire'
import Error from './pages/Error'
import Tinder from './pages/Tinder'
import Favourites from './pages/Favourites'
import Details from './pages/Details'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/tinder" element={<Tinder />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  )
}

export default App
