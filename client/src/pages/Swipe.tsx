import React, { useState, useEffect, useCallback } from "react";
import { FaQuestion } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import "intro.js/minified/introjs.min.css";

import Sidebar from '../components/Sidebar'
import Map from '../components/Map'
import SwipeCards from "../components/SwipeCards";
import introJs from 'intro.js';
import Dock from "../components/Dock";


const Swipe = () => {
  const location = useLocation();
  const listings = location.state?.listings || [];
  console.log('Swipe page listings:', listings);
  console.log('Location state:', location.state);
  const [newLocation,setnewLocation] = useState<[number,number] | undefined>();
  // const [activeCard, setActiveCard] = useState<number>(0)
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const idleTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [cardsMinimized, setCardsMinimized] = useState(false); // add

  // Idle detection
  const IDLE_TIMEOUT = 5000; // 5 seconds

  const resetIdleTimer = useCallback(() => {
    console.log('User activity detected, resetting idle timer');
    setIsIdle(false);
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      console.log('User is idle');
      setIsIdle(true);
    }, IDLE_TIMEOUT);
  }, []);

  useEffect(() => {
    const events = ['click', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    resetIdleTimer(); // Start timer on mount

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [resetIdleTimer]);


  // Handle next location to fly to from Cards
  const handleClick = (newLocation:[number,number]) => {
    console.log("Button clicked",newLocation)
    setnewLocation(newLocation);
  }

  // Intro.js tutorial for new users
  const startTutorial = () => {
    introJs().setOptions({
      steps: [
        {
          element: '.sidebar', // Target the sidebar element
          title: 'Welcome to GreatAI!👋',
          intro: 'This is the sidebar where you can navigate through different sections.',
          highlightClass: "introjs-custom-highlight",
        },
        {
          element: '.map-container', // Target the map element
          title: 'Map View',
          intro: 'This is the map view where you can see the locations of the listings.',
          highlightClass: "introjs-custom-highlight",
        },
        {
          element: '.cards', // Target the Cards element
          title: 'Cards',
          intro: 'FRestate AI have chosen some houses/buildings you might like!',
          highlightClass: "introjs-custom-highlight",
        },
        {
          element: '.cards', // Target the Cards element
          title: 'Interact with Cards',
          intro: 'Swipe LEFT if you do not like the house/building, swipe RIGHT to favourite the ones you like!',
          highlightClass: "introjs-custom-highlight",
        },
        {
          title: 'Get Started!',
          intro: 'Feel free to explore the app and click on any listing to see more details on the map.',
          highlightClass: "introjs-custom-highlight",
        },
      ],
    }).start();
  };
  
  useEffect(() => {
    // Inject custom Intro.js styles
    const style = document.createElement("style");
    style.innerHTML = `
      .introjs-tooltip {
        color: #000;
        font-family: system-ui;
      }
      .introjs-tooltip-title {
        font-size: 1.5rem;
        font-weight: bold;
        font-family: system-ui;        
      }
      .introjs-nextbutton {
        background-color: #4B0082;
        border-radius:.6em;
        color: white;
        text-shadow: none;
      }
      introjs-nextbutton:hover {
        background-color: #5C6DC9;
        color: white;
        border-color: unset;
        font-family: system-ui;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex">
      <Sidebar />
      <Dock/>
      <button className="btn btn-square border-e border-gray-300 bg-white hover:bg-gray-100 h-10 w-10 fixed top-1 left-2 md:z-5 z-20 md:hover:top-15 md:top-15  transition-all" onClick={startTutorial}>
        <FaQuestion />
      </button>
      <div className="flex-1 h-full w-full">
        <Map newLocation={newLocation || [101.7001903848135,3.055492032127826]} isIdle={isIdle} setZoom={16.00} setPitch={60} />

        <div
          className={`absolute top-0 right-0 h-full w-[32rem] max-w-full z-10 
          ${cardsMinimized ? 'pointer-events-none p-0' : 'pointer-events-auto p-6'} 
          md:pointer-events-auto md:p-6`}
        >
          <SwipeCards
            listings={listings}
            onCardClick={handleClick}
            onMinimizedChange={setCardsMinimized} // add
          />
          {/* <Cards listings={listings} onCardClick={handleClick} /> */}
        </div>
      </div>
    </div>
  )
}
export default Swipe
