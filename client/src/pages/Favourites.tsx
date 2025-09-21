import React from 'react'
import Sidebar from '../components/Sidebar'
import MasonaryCards from '../components/MasonaryCards'
import Dock from '../components/Dock'

function Favourites() {
  // Example favorites list; replace with real data source (context, API, etc.)
  

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Dock/>
      <main className="flex-1 m-10">
        <h1 className="text-2xl font-bold pl-4 pt-4 ">Your Favourites</h1>
        <MasonaryCards />
      </main>
    </div>
  )
}

export default Favourites

