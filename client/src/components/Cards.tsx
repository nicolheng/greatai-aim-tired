import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

type Listing = {
  id: number;
  title: string;
  image: string;
  image2?: string;
  image3?: string;
  price: string;
  location: string;
  tags?: string[];
  isNew?: boolean;
  description?: string;
};

function Cards({ listings }: { listings: Listing[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);
  const touchStartX = useRef<number | null>(null);
  const navigate = useNavigate();
  const [swipeDirection, setSwipeDirection] = useState<null | 'left' | 'right'>(null);
  const [animating, setAnimating] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -50 && currentIdx < listings.length - 1) {
      setSwipeDirection('left');
      setAnimating(true);
      setTimeout(() => {
        setCurrentIdx(idx => idx + 1);
        setSwipeDirection(null);
        setAnimating(false);
      }, 250);
    } else if (deltaX > 50 && currentIdx > 0) {
      setSwipeDirection('right');
      setAnimating(true);
      setTimeout(() => {
        setCurrentIdx(idx => idx - 1);
        setSwipeDirection(null);
        setAnimating(false);
      }, 250);
    }
    touchStartX.current = null;
  };

  if (isMobile) {
    const listing = listings[currentIdx];
    // Animation styles
    let transitionClass = '';
    if (animating && swipeDirection === 'left') {
      transitionClass = 'animate-swipe-left';
    } else if (animating && swipeDirection === 'right') {
      transitionClass = 'animate-swipe-right';
    }

    return (
      <div
        className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`card bg-white min-w-full max-w-3xl border-1 border-gray-300 transition-transform duration-300 ease-in-out ${transitionClass}`}
          style={{
            transform:
              animating && swipeDirection === 'left'
                ? 'translateX(-100vw)'
                : animating && swipeDirection === 'right'
                ? 'translateX(100vw)'
                : 'translateX(0)',
          }}
        >
          <div className="card-body pt-4 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="card-title mb-0">
                {listing.title}
                {listing.isNew && <div className="badge badge-secondary ml-2">NEW</div>}
              </h2>
              <span className="font-bold text-lg ml-2">{listing.price}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{listing.location}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate(`/details/${listing.id}`)}
              >
                More Details
              </button>
              <span className="text-xs">{currentIdx + 1} / {listings.length}</span>
            </div>
            <div className="flex justify-center items-center mt-2 space-x-2">
              <button
                className="btn btn-xs"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(idx => Math.max(0, idx - 1))}
              >
                ◀
              </button>
              <button
                className="btn btn-xs"
                disabled={currentIdx === listings.length - 1}
                onClick={() => setCurrentIdx(idx => Math.min(listings.length - 1, idx + 1))}
              >
                ▶
              </button>
            </div>
            <div className="text-center text-xs text-gray-400 mt-1">Swipe left/right to see more</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4 w-full">
      {listings.map(listing => (
        <div key={listing.id} className="card bg-white min-w-full max-w-3xl sm:min-w-full border-1 border-gray-300">
          {/* Custom image grid */}
          <div className="grid grid-cols-3 grid-rows-2 gap-2 p-4">
            {/* Main cover image: spans 2 cols and 2 rows */}
            <div className="col-span-2 row-span-2">
              <img
                src={listing.image}
                alt={listing.title}
                className="object-cover w-full h-full rounded-xl min-h-[180px] max-h-[260px]"
              />
            </div>
            {/* Top right image (placeholder or extra image) */}
            <div className="col-start-3 row-start-1">
              <img
                src={listing.image2 || listing.image}
                alt={listing.title + ' extra 1'}
                className="object-cover w-full h-full rounded-xl min-h-[85px] max-h-[120px]"
              />
            </div>
            {/* Bottom right image (placeholder or extra image) */}
            <div className="col-start-3 row-start-2">
              <img
                src={listing.image3 || listing.image}
                alt={listing.title + ' extra 2'}
                className="object-cover w-full h-full rounded-xl min-h-[85px] max-h-[120px]"
              />
            </div>
          </div>
          <div className="card-body pt-2">
            <h2 className="card-title">
              {listing.title}
              {listing.isNew && <div className="badge badge-secondary">NEW</div>}
            </h2>
            <p className="text-sm text-gray-500">{listing.location}</p>
            <p className="font-bold text-lg">{listing.price}</p>
            {listing.description && <p className="text-xs mt-1">{listing.description}</p>}
            <div className="card-actions justify-end flex-wrap mt-2">
              {listing.tags?.map(tag => (
                <div key={tag} className="badge badge-outline">{tag}</div>
              ))}
              <button
                className="btn btn-primary btn-sm ml-2"
                onClick={() => navigate(`/details/${listing.id}`)}
              >
                More Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


export default Cards
