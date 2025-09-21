import Map from './Map';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2';

interface CardCarouselProps {
  images: readonly string[];
}

function CardCarousel({ images }: CardCarouselProps) {

    const [isIdle, setIsIdle] = useState<boolean>(false);
    const [isFavourite, setIsFavourite] = useState(false);
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




  return (<>
    {/* Slider */}
<div data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }' className="relative">
  {/* Favourite Heart Button */}
  <button
    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md flex items-center justify-center transition hover:bg-gray-100"
    aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
    onClick={() => setIsFavourite(fav => !fav)}
    type="button"
  >
    {isFavourite ? (
      <HiHeart className="text-red-500 w-6 h-6" />
    ) : (
      <HiOutlineHeart className="text-gray-700 w-6 h-6" />
    )}
  </button>
  <div className="hs-carousel relative overflow-hidden w-full min-h-96 h-[65vh] bg-white rounded-lg">
    <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
      {images.map((image, index) => (
        <div key={index} className="hs-carousel-slide">
          <div className="flex justify-center h-full bg-gray-100">
            <img 
              src={image} 
              alt={`Property image ${index + 1}`} 
              className="w-full h-full object-cover transition duration-700"
            />
          </div>
        </div>
      ))}
    </div>

    <div className="absolute flex bottom-0 right-0 w-[15vw] h-[10vw] rounded-4xl bg-cyan-200 z-2 mb-4 mr-4 overflow-hidden justify-center items-center place-items-center m-auto border-2 border-gray-600">
            <Map newLocation={[101.7001903848135,3.055492032127826]} isIdle={isIdle} setZoom={15.3} setPitch={70}/> 

    </div> 

    <div className="hs-carousel-pagination absolute bottom-3 start-0 w-full overflow-x-auto">
      <div className="flex flex-row items-center justify-center gap-x-2 px-2">
        {images.map((image, index) => (
          <div key={index} className="hs-carousel-pagination-item shrink-0 border border-gray-200 rounded-md overflow-hidden cursor-pointer w-16 h-12 hs-carousel-active:border-blue-400">
            <div className="flex justify-center h-full bg-gray-100">
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover transition duration-700"
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    <button type="button" className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-s-lg">
      <span className="text-2xl" aria-hidden="true">
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </span>
      <span className="sr-only">Previous</span>
    </button>
    <button type="button" className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-e-lg">
      <span className="sr-only">Next</span>
      <span className="text-2xl" aria-hidden="true">
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </span>
    </button>
  </div>
</div>
{/* End Slider */}</>

  );
}

export default CardCarousel;