import React from 'react'
import { HiOutlineHome, HiOutlineSparkles, HiOutlineHeart } from 'react-icons/hi2'

function Dock() {
  return (
    <div className="dock dock-lg md:hidden sm:fixed z-50">
      {/* Home */}
      <button className="active:dock-active flex flex-col items-center gap-1" onClick={() => window.location.href = '/'}
      >
        <HiOutlineHome className="text-2xl" />
        <span className="dock-label">Home</span>
      </button>
      {/* AI */}
      <button className="active:dock-active flex flex-col items-center gap-1" onClick={() => window.location.href = '/questionnaire'}
      >
        <HiOutlineSparkles className="text-2xl" />
        <span className="dock-label">AI</span>
      </button>
      {/* Favourites */}
      <button className="active:dock-active flex flex-col items-center gap-1" onClick={() => window.location.href = '/favourites'}
      >
        <HiOutlineHeart className="text-2xl" />
        <span className="dock-label">Favourites</span>
      </button>
    </div>
  )
}

export default Dock
