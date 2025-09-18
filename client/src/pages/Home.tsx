
import React, { useState, useEffect, useCallback } from "react";

import Sidebar from '../components/Sidebar'
import Cards from '../components/Cards'
import Map from '../components/Map'


const listings = [
  {
    id: 0,
    title: 'Modern Family Home',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
    price: '$450,000',
    location: 'Suburbia, Springfield',
    tags: ['4 Bed', '3 Bath', 'Garage'],
    isNew: true,
    description: 'Spacious modern home with open plan living and large backyard.',
    coords: [101.70056556641042,3.055193146388439],
  },
  {
    id: 1,
    title: 'Downtown Apartment',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    price: '$320,000',
    location: 'Downtown, Metropolis',
    tags: ['2 Bed', '1 Bath', 'City View'],
    isNew: false,
    description: 'Cozy apartment in the heart of the city, close to all amenities.',
    coords: [101.71341249524647, 3.14899283474485]
  },
  {
    id: 2,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.',
    coords: [99.85198429240435, 6.308492265209934], 
  },
  {
    id: 3,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.',
    coords: [102.24934548175467, 2.1944992542512964],
  },
  {
    id: 4,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.',
    coords: [116.05129273943278, 5.923560454410471],
  },
  {
    id: 5,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.',
    coords: [101.96053149325238, 2.757756104575761],
  },
]


const Home = () => {
  const [newLocation,setnewLocation] = useState<[number,number]>([101.7006, 3.0550]); //currently set on default APU, later should be set first recommended location
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const idleTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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

  const handleClick = (newLocation:[number,number]) => {
    console.log("Button clicked",newLocation)
    setnewLocation(newLocation);
  }

  return (
    <div className="m-4 grid grid-cols-3 grid-rows-5 gap-4 h-[calc(100vh-2rem)]">
      <div className="row-span-5 col-start-1 col-span-2 row-start-1 h-full rounded-b-full">
        <Map newLocation={newLocation} isIdle={isIdle} />
      </div>
      <div className="col-span-3 row-span-5 col-start-3 row-start-1 h-full overflow-y-auto">
        <Cards listings={listings} onCardClick={handleClick} />
      </div>
    </div>
  )
}
export default Home

