import React, { useEffect, useRef, useState } from 'react';
import { HiHeart } from 'react-icons/hi2';
import { HiOutlineTrash } from "react-icons/hi";
import { HiChevronUp, HiChevronDown } from 'react-icons/hi2';

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
  coords: [number, number];
};

interface SwipeCardProps{
  listings: Listing[],
  onCardClick: (newLocation: [number, number]) => void;
  onMinimizedChange?: (minimized: boolean) => void; // add
}

// const demoCards = [
//   {
//     id: 1,
//     image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
//     title: 'Walkers Delight , ',
//   },
//   {
//     id: 2,
//     image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
//     title: 'Downtown Apartment',
//   },
//   {
//     id: 3,
//     image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
//     title: 'Country Cottage 1',
//   },
//   {
//     id: 4,
//     image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
//     title: 'Country Cottage 2',
//   },
//   {
//     id: 5,
//     image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
//     title: 'Country Cottage 3 ',
//   },
//   {
//     id: 6,
//     image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
//     title: 'Country Cottage 4',
//   },
//   {
//     id: 7,
//     image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
//     title: 'Country Cottage 5',
//   },
// ]


// Drag state now includes startX/startY for tracking

function SwipeCards({listings,onCardClick, onMinimizedChange}: SwipeCardProps) {
  const [cards, setCards] = useState(listings)
  const [drag, setDrag] = useState({ x: 0, y: 0, isDragging: false, startX: 0, startY: 0 })
  const [animating, setAnimating] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [swipeResult, setSwipeResult] = useState<null | 'left' | 'right'>(null)
  const [outDirection, setOutDirection] = useState<'left' | 'right' | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const MAX_ANGLE = 30

  // Drag handlers for the image
  const handleImgDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    let clientX = 0, clientY = 0
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else if ('clientX' in e) {
      clientX = e.clientX
      clientY = e.clientY
    }
    setDrag({ ...drag, isDragging: true, startX: clientX, startY: clientY })
    setSwipeResult(null)
  }

  const handleImgDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drag.isDragging) return
    let clientX = 0, clientY = 0
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else if ('clientX' in e) {
      clientX = e.clientX
      clientY = e.clientY
    }
    setDrag((prev) => ({ ...prev, x: clientX - prev.startX, y: clientY - prev.startY }))
  }

  const handleImgDragEnd = () => {
    if (!drag.isDragging) return
    const threshold = 80
    if (Math.abs(drag.x) < threshold) {
      setDrag({ x: 0, y: 0, isDragging: false, startX: 0, startY: 0 })
      setSwipeResult(null)
      return
    }
    const direction = drag.x > threshold ? 'right' : 'left'
    setOutDirection(direction)
    animateOut(direction)
  }



  // Animate next card sliding up
  const animateOut = (direction: 'left' | 'right') => {
    setOutDirection(direction)
    setAnimating(true)
    setShowNext(true)
    setTimeout(() => {
      setCards((prev) => prev.slice(1))
      setDrag({ x: 0, y: 0, isDragging: false, startX: 0, startY: 0 })
      setAnimating(false)
      setShowNext(false)
      setSwipeResult(null)
      setOutDirection(null)
    }, 350)
  }

  const topCard = cards[0]
  const nextCard = cards[1]
  const thirdCard = cards[2]
  const fourthCard = cards[3]
  const fifthCard = cards[4]

  // notify parent when minimized changes
  useEffect(() => {
    onMinimizedChange?.(isMinimized);
  }, [isMinimized, onMinimizedChange]);

  return (
    <>
      {/* Mobile floating toggle above the dock (always visible on mobile) */}
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        aria-label={isMinimized ? 'Expand cards' : 'Collapse cards'}
        className="md:hidden fixed left-1/2 -translate-x-1/2 bottom-24 z-[9999] pointer-events-auto bg-white rounded-full shadow-lg p-3 border border-gray-200"
      >
        {isMinimized ? (
          <HiChevronUp className="w-6 h-6 text-gray-700" />
        ) : (
          <HiChevronDown className="w-6 h-6 text-gray-700" />
        )}
      </button>

      <div
        className={`cards relative w-[350px] mx-auto select-none transition-all ${
          isMinimized ? 'h-0 p-0 mt-0 pointer-events-none' : 'h-[480px] p-6 mt-10'
        } md:h-[480px] md:p-6 md:mt-10 md:pointer-events-auto`}
      >
        {/* Hide everything (on mobile) when minimized so the map is fully touchable */}
        <div className={`md:block ${isMinimized ? 'hidden' : 'block'}`}>
          {cards.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-base-200 rounded-2xl shadow-lg">
              <span className="text-lg text-base-content/60">No more cards</span>
            </div>
          )}
          {nextCard && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg z-0 border border-base-300 transition-transform duration-500 ${showNext ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-95'}`}
              style={{
                transform: 'translateY(110px) scale(0.95)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              <img src={nextCard.image} alt={nextCard.title} className="w-[270px] h-[330px] object-cover rounded-xl mt-8" />
              <div className="mt-4 text-lg font-semibold">{nextCard.title}</div>
            </div>
          )}
          {thirdCard && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg z-0 border border-base-300 transition-transform duration-500 ${showNext ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-95'}`}
              style={{
                transform: 'translateY(80px) scale(0.95)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              <img src={thirdCard.image} alt={thirdCard.title} className="w-[270px] h-[330px] object-cover rounded-xl mt-8" />
              <div className="mt-4 text-lg font-semibold">{thirdCard.title}</div>
            </div>
          )}
          {fourthCard && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg z-0 border border-base-300 transition-transform duration-500 ${showNext ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-95'}`}
              style={{
                transform: 'translateY(50px) scale(0.95)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              <img src={fourthCard.image} alt={fourthCard.title} className="w-[270px] h-[330px] object-cover rounded-xl mt-8" />
              <div className="mt-4 text-lg font-semibold">{fourthCard.title}</div>
            </div>
          )}
          {fifthCard && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg z-0 border border-base-300 transition-transform duration-500 ${showNext ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-95'}`}
              style={{
                transform: 'translateY(20px) scale(0.95)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              <img src={fifthCard.image} alt={fifthCard.title} className="w-[270px] h-[330px] object-cover rounded-xl mt-8" />
              <div className="mt-4 text-lg font-semibold">{fifthCard.title}</div>
            </div>
          )}
          {topCard && (
            <div
              ref={cardRef}
              className={`absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl z-10 border border-base-300 cursor-grab transition-transform duration-200 ${animating ? 'pointer-events-none' : ''}`}
              style={{
                transform: outDirection
                  ? `translateX(${outDirection === 'right' ? '8rem' : '-8rem'}) rotate(${outDirection === 'right' ? MAX_ANGLE : -MAX_ANGLE}deg) scale(0.5)`
                  : `translateX(${drag.x}px) rotate(${drag.x/10}deg) scale(1)`,
                transition: animating ? 'transform 0.35s ease-out' : undefined,
                transformOrigin: '50% 100%',
                zIndex: 2,
              }}
              onClick={() => onCardClick(topCard.coords)}
              onMouseDown={handleImgDragStart}
              onMouseMove={drag.isDragging ? handleImgDragMove : undefined}
              onMouseUp={handleImgDragEnd}
              onMouseLeave={drag.isDragging ? handleImgDragEnd : undefined}
              onTouchStart={handleImgDragStart}
              onTouchMove={handleImgDragMove}
              onTouchEnd={handleImgDragEnd}
            >
              {/* Custom image grid */}
              <div className="grid grid-cols-3 grid-rows-2 gap-2 p-4"
                draggable={false}
                style={{ userSelect: 'none' }}>
                {/* Main cover image: spans 2 cols and 2 rows */}
                <div className="col-span-2 row-span-2">
                  <img
                    src={topCard.image}
                    alt={topCard.title}
                    className="object-cover w-full h-full rounded-xl min-h-[180px] max-h-[260px]"
                  />
                </div>
                {/* Top right image (placeholder or extra image) */}
                <div className="col-start-3 row-start-1">
                  <img
                    src={topCard.image2 || topCard.image}
                    alt={topCard.title + ' extra 1'}
                    className="object-cover w-full h-full rounded-xl min-h-[85px] max-h-[120px]"
                  />
                </div>
                {/* Bottom right image (placeholder or extra image) */}
                <div className="col-start-3 row-start-2">
                  <img
                    src={topCard.image3 || topCard.image}
                    alt={topCard.title + ' extra 2'}
                    className="object-cover w-full h-full rounded-xl min-h-[85px] max-h-[120px]"
                  />
                </div>
              </div>
              <div className="card-body pt-2">
                <h2 className="card-title">
                  {topCard.title}
                  {topCard.isNew && <div className="badge badge-secondary">NEW</div>}
                </h2>
                <p className="text-sm text-gray-500">{topCard.location}</p>
                <p className="font-bold text-lg">{topCard.price}</p>
                {topCard.description && <p className="text-xs mt-1">{topCard.description}</p>}
                <div className="card-actions justify-end flex-wrap mt-2">
                  {topCard.tags?.map(tag => (
                    <div key={tag} className="badge badge-outline">{tag}</div>
                  ))}
                </div>
              </div>
                {/* Overlay icons for swipe direction only after drag ends */}
                {(() => {
                  const currentDirection = outDirection || swipeResult || (drag.isDragging && Math.abs(drag.x) >20 ? (drag.x > 0 ? 'right' : 'left') : null);
                  const overlayOpacity = animating ? 1 : Math.min(Math.abs(drag.x) / 100, 1);
                  return (
                    <>
                    {currentDirection === 'right' && (
                      <div className="absolute top-10 left-10 bg-green-200 rounded-full shadow-lg rotate-[-15deg] p-6"
                      style={{ opacity: overlayOpacity }}>
                        <HiHeart className='text-green-700'/>
                      </div>
                    )}
                    {currentDirection === 'left' && (
                      <div className="absolute top-10 right-10 bg-red-200 rounded-full shadow-lg rotate-[15deg] p-6"
                      style={{ opacity: overlayOpacity }}>
                        <HiOutlineTrash className='text-red-700' />
                      </div>
                    )}
                    </>
                  );
                }) ()}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SwipeCards