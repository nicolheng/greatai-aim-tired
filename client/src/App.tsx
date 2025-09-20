import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Questionnaire from './pages/Questionnaire'
import Error from './pages/Error'
import Tinder from './pages/Tinder'
import FavouriteList from './pages/Favourites'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/tinder" element={<Tinder />} />
        <Route path="/favourites" element={<FavouriteList />} />
      </Routes>
    </Router>
  )
}

export default App
