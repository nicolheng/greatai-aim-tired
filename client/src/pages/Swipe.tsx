import React, { useState, useEffect, useCallback } from "react";
import { FaQuestion } from "react-icons/fa6";
import "intro.js/minified/introjs.min.css";

import Sidebar from '../components/Sidebar'
import Map from '../components/Map'
import SwipeCards from "../components/SwipeCards";
import introJs from 'intro.js';
import Dock from "../components/Dock";

// const listings = [
//   {
//     id: 1,
//     title: 'Downtown Apartment',
//     image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
//     price: '$450,000',
//     location: 'Suburbia, Springfield',
//     tags: ['4 Bed', '3 Bath', 'Garage'],
//     isNew: true,
//     description: 'Spacious modern home with open plan living and large backyard.',
//     coords: [101.7001903848135,3.055492032127826], 
//   },
//   {
//     id: 2,
//     title: 'Downtown Apartment',
//     image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
//     price: '$320,000',
//     location: 'Downtown, Metropolis',
//     tags: ['2 Bed', '1 Bath', 'City View'],
//     isNew: false,
//     description: 'Cozy apartment in the heart of the city, close to all amenities.',
//     coords: [101.71341249524647, 3.14899283474485]
//   },
//   {
//     id: 3,
//     title: 'Country Cottage',
//     image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
//     price: '$275,000',
//     location: 'Countryside, Greenfield',
//     tags: ['3 Bed', '2 Bath', 'Garden'],
//     isNew: true,
//     description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.',
//     coords: [99.85198429240435, 6.308492265209934], 
//   },
//   {
//     id: 4,
//     title: 'Country Cottage',
//     image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
//     price: '$275,000',
//     location: 'Countryside, Greenfield',
//     tags: ['3 Bed', '2 Bath', 'Garden'],
//     isNew: true,
//     description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.',
//     coords: [102.24934548175467, 2.1944992542512964],
//   },
//   {
//     id: 5,
//     title: 'Country Cottage',
//     image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
//     price: '$275,000',
//     location: 'Countryside, Greenfield',
//     tags: ['3 Bed', '2 Bath', 'Garden'],
//     isNew: true,
//     description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.',
//     coords: [116.05129273943278, 5.923560454410471],
//   },
//   {
//     id: 6,
//     title: 'Country Cottage',
//     image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
//     price: '$275,000',
//     location: 'Countryside, Greenfield',
//     tags: ['3 Bed', '2 Bath', 'Garden'],
//     isNew: true,
//     description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.',
//     coords: [101.96053149325238, 2.757756104575761],
//   },
// ]


const Home = () => {
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
        <Map newLocation={newLocation} isIdle={isIdle} setZoom={16.00} />

        <div
          className={`absolute top-0 right-0 h-full w-[32rem] max-w-full z-10 
          ${cardsMinimized ? 'pointer-events-none p-0' : 'pointer-events-auto p-6'} 
          md:pointer-events-auto md:p-6`}
        >
    
          {/* Display filtered listings using SwipeCards */}
          {filteredListings.length > 0 && (
            <div className="w-full p-4">
              <h2 className="text-xl font-bold mb-4">Recommended Properties</h2>
              <SwipeCards
                listings={filteredListings.map((property) => ({
                  id: parseInt(property.id, 10), // Convert id to number
                  title: property.title,
                  image: property.cover.url,
                  price: property.prices[0]?.min ? `RM ${property.prices[0].min}` : 'Price not available',
                  location: property.address.formattedAddress,
                  coords: [property.address.lat, property.address.lng]
                }))}
                onCardClick={(newLocation) => console.log('Navigate to:', newLocation)}
              />
            </div>
          )}
          {/* <SwipeCards
            onCardClick={handleClick}
            onMinimizedChange={setCardsMinimized} // add
          /> */}
          {/* <Cards listings={listings} onCardClick={handleClick} /> */}
          
        </div>
      </div>
    </div>
  )
}
export default Home
