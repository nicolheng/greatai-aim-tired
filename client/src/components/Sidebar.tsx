import React, { useState } from 'react'
import { HiOutlineHome, HiOutlineHeart, HiSparkles, HiBars3, HiXMark } from 'react-icons/hi2';
import LogoLong from '../assets/logo-long.png';

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Toggle button */}
      {!open && (
        <button
          className="btn btn-square border-e border-gray-300 bg-white hover:bg-gray-100 fixed top-2 hover:top-2.5 left-2 z-50 transition-all hidden sm:flex"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <HiBars3 size={22} />
        </button>
      )}

      {/* Horizontal bar */}
      <div
        className={`
          fixed top-0 left-0 z-40 transition-transform duration-200
          w-full max-w-xl
          ${open ? 'translate-y-0' : '-translate-y-full'}
        `}
        style={{ minWidth: '320px' }}
      >
        <div className="flex flex-row items-center bg-white rounded-b-xl shadow-lg px-4 py-2 gap-1 border-b border-gray-200 ">
          {/* Close button */}
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <HiXMark size={22} />
          </button>
          {/* Logo */}
          <img src={LogoLong} alt="Logo" className="mix-blend-multiply h-10 relative" />
          {/* Links */}
          <a className="btn btn-ghost flex items-center gap-2" href="/">
            <HiOutlineHome size={20} />
            <span className="hidden sm:inline">Home</span>
          </a>
          <a className="btn btn-ghost flex items-center gap-2" href="/favourites">
            <HiOutlineHeart size={20} />
            <span className="hidden sm:inline">Favourites</span>
          </a>
          {/* Feature card as a button */}
          <a href="/questionnaire" className="btn btn-ghost flex items-center gap-2 ml-auto">
            <HiSparkles size={20} className="text-indigo-700" />
            <span className="hidden sm:inline font-bold">AI Matcher</span>
          </a>
        </div>
      </div>
      {/* Overlay */}
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
    //       <a className="p-3 flex items-center gap-3" href="/">
    //         <HiOutlineHome size={22} />
    //         Home
    //       </a>
    //     </li>
    //     <li>
    //       <a className="p-3 flex items-center gap-3" href="/favourites">
    //         <HiOutlineHeart size={22} />
    //         Favourites
    //       </a>
    //     </li>
    //     {/* Removed Houses and Settings menu items */}
    //     <div className="flex-1" />
    //     <li className="mb-4 mx-2">
    //       <div className="card bg-base-200 hover:bg-base-300 transition-all duration-300 rounded-xl p-4 flex flex-col items-start border-1 border-gray-300">
    //         <a href="/questionnaire" className="w-full flex items-start gap-3">
    //           <span className="mt-0.5">
    //             <HiSparkles size={22} className="text-indigo-700" />
    //           </span>
    //           <div className="flex-1">
    //             <div className="font-bold text-base mb-1">New feature available!</div>
    //             <div className="text-xs text-base-content/70 mb-2">Try our AI-powered property matcher to get instant recommendations tailored for you.</div>
    //           </div>
    //         </a>
    //       </div>
    //     </li>
    //   </ul>
    //   {/* Overlay for when sidebar is open */}
    //   {open && (
    //     <div
    //       className="fixed inset-0 bg-base-300/20 z-30"
    //       onClick={() => setOpen(false)}
    //     />
//     //   )}
//     // </div>
//   )
// }


// export default Sidebar
