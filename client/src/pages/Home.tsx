import React, { useCallback, useState , useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Cards from '../components/Cards'
import Map from '../components/Map'

const listings = [
  {
    id: 1,
    title: 'Modern Family Home',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
    price: '$450,000',
    location: 'Suburbia, Springfield',
    tags: ['4 Bed', '3 Bath', 'Garage'],
    isNew: true,
    description: 'Spacious modern home with open plan living and large backyard.'
  },
  {
    id: 2,
    title: 'Downtown Apartment',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    price: '$320,000',
    location: 'Downtown, Metropolis',
    tags: ['2 Bed', '1 Bath', 'City View'],
    isNew: false,
    description: 'Cozy apartment in the heart of the city, close to all amenities.'
  },
  {
    id: 3,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.'
  },
  {
    id: 3,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.'
  },
  {
    id: 3,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.'
  },
  {
    id: 3,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.'
  },
]

function Home() {
  const [newLocation,setnewLocation] = useState<[number,number] | undefined>(); //currently set on default APU, later should be set first recommended location
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
    <div className="relative w-full h-screen flex">
      <Sidebar />
      <div className="flex-1 h-full w-full">
        <Map newLocation={newLocation} isIdle={isIdle} setZoom={16.00}/>
        <div className="absolute top-0 right-0 h-full w-[32rem] max-w-full overflow-y-auto z-10 p-6">
          <Cards listings={listings} />
        </div>
      </div>
    </div>
  )
}
export default Home

