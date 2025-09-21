import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import MasonaryCards from '../components/MasonaryCards'
import Dock from '../components/Dock'

function Favourites() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time for favorites to load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Dock/>
      <main className="flex-1 m-10">
        <h1 className="text-2xl font-bold pl-4 pt-4 ">Your Favourites</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <span className="ml-4 text-lg">Loading your favorites...</span>
          </div>
        ) : (
          <MasonaryCards />
        )}
      </main>
    </div>
  )
}

export default Favourites
