import React, { useState } from 'react'
// import ThemeToggle from './ThemeToggle';

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      {/* Burger button - absolutely positioned top left, hidden when sidebar is open */}
      {!open && (
        <button
          className="btn btn-square border-e border-gray-300 bg-white hover:bg-gray-100 fixed top-2 left-2 z-50 hover:top-2.5 transition-all"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
      {/* Sidebar */}
      <ul
        className={`
          menu bg-white rounded-box w-80 h-screen
          fixed top-0 left-0 z-40 transition-transform duration-200 flex flex-col
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ maxWidth: '20rem' }}
        onClick={() => setOpen(false)}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end">
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
        <p className='text-center'><span  className="text-4xl font-bold text-indigo-600">FR</span> <span className='text-indigo-400 text-xl font-bold'>estate</span></p>        <hr className='border-gray-300 my-3' />
        <li>
          <a className="p-3 flex items-center gap-3" href="/">
            {/* Home icon (Heroicons solid) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>
            Home
          </a>
        </li>
        <li>
          <a className="p-3 flex items-center gap-3" href="/favourites">
            {/* Heart icon (Heroicons outline) */}
            <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>

            Favourites
          </a>
        </li>
        <li>
          <a className="p-3 flex items-center gap-3" href="/houses">
            {/* Building/house icon (Heroicons outline) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75l8.954-8.955c.44-.439 1.152-.439 1.591 0l8.955 8.955M4.5 10.5v8.25c0 .621.504 1.125 1.125 1.125h3.75v-4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V20.25h3.75c.621 0 1.125-.504 1.125-1.125V10.5" /></svg>
            Houses
          </a>
        </li>
        <li>
          <a className="p-3 flex items-center gap-3" href="/settings">
            {/* Cog/settings icon (Heroicons solid) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125 1.125 0 01.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.929-.78l-.894-.149c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.02.94-1.11l.894-.15c.424-.07.764-.383.929-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.774-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Settings
          </a>
        </li>
        <div className="flex-1" />
        <li className="mb-4 mx-2">
          <div className="card bg-base-200 hover:bg-base-300 transition-all duration-300 rounded-xl p-4 flex flex-col items-start border-1 border-gray-300">
            <a href="/questionnaire" className="w-full flex items-start gap-3">
              {/* AI Sparkle SVG */}
              <span className="mt-0.5">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-indigo-700" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M14 3v4M14 21v4M25 14h-4M7 14H3M21.071 6.929l-2.828 2.828M9.757 18.243l-2.828 2.828M21.071 21.071l-2.828-2.828M9.757 9.757L6.929 6.929" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="14" cy="14" r="4" fill="currentColor" fillOpacity="0.2"/>
                    <circle cx="14" cy="14" r="2" fill="currentColor"/>
                  </g>
                </svg>
              </span>
              <div className="flex-1">
                <div className="font-bold text-base mb-1">New feature available!</div>
                <div className="text-xs text-base-content/70 mb-2">Try our AI-powered property matcher to get instant recommendations tailored for you.</div>
              </div>
            </a>
          </div>
        </li>
      </ul>
      {/* Overlay for when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-base-300/20 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  )
}

export default Sidebar
