import React, { useState } from 'react'

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      {/* Burger button for mobile - absolutely positioned top left */}
      <button
        className="btn btn-square btn-ghost fixed top-2 left-2 z-50 lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Open sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Sidebar */}
      <ul
        className={`
          menu bg-base-200 rounded-box w-80 h-screen
          fixed top-0 left-0 z-40 transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:fixed lg:top-0 lg:left-0
          ${open ? '' : 'lg:block'}
        `}
        style={{ maxWidth: '20rem' }}
        onClick={() => setOpen(false)}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end lg:hidden">
          <button
            className="btn btn-square btn-ghost m-2"
            onClick={e => { e.stopPropagation(); setOpen(false); }}
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <li className="menu-title">Title</li>
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
        <li><a>Item 3</a></li>
      </ul>
      {/* Overlay for mobile when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-200 opacity-40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  )
}

export default Sidebar
