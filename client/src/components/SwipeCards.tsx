import React, { useRef, useState } from 'react'

const demoCards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
    title: 'Serena Bay Cottage',
    Description:'A quiet area with scenic views',
    nearbyIcons:'',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Downtown Apartment',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    title: 'Country Cottage 1',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    title: 'Country Cottage 2',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    title: 'Country Cottage 3 ',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    title: 'Country Cottage 4',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    title: 'Country Cottage 5',
  },
]


// Drag state now includes startX/startY for tracking
function SwipeCards() {
  const [cards, setCards] = useState(demoCards)
  const [drag, setDrag] = useState({ x: 0, y: 0, isDragging: false, startX: 0, startY: 0 })
  const [animating, setAnimating] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [swipeResult, setSwipeResult] = useState<null | 'left' | 'right'>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

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
    const threshold = 120
    if (drag.x > threshold) {
      setSwipeResult('right')
      animateOut('right')
    } else if (drag.x < -threshold) {
      setSwipeResult('left')
      animateOut('left')
    } else {
      setDrag({ x: 0, y: 0, isDragging: false, startX: 0, startY: 0 })
      setSwipeResult(null)
    }
  }

  // Animate next card sliding up
  const animateOut = (direction: 'left' | 'right') => {
    setAnimating(true)
    setShowNext(true)
    setTimeout(() => {
      setCards((prev) => prev.slice(1))
      setDrag({ x: 0, y: 0, isDragging: false, startX: 0, startY: 0 })
      setAnimating(false)
      setShowNext(false)
      setSwipeResult(null)
    }, 350)
  }

  const topCard = cards[0]
  const nextCard = cards[1]
  const thirdCard = cards[2]

  return (
    <div className="relative w-[350px] h-[480px] mx-auto mt-10 select-none">
      {cards.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-200 rounded-2xl shadow-lg">
          <span className="text-lg text-base-content/60">No more cards</span>
        </div>
      )}
      {thirdCard && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow z-0 border border-base-300 transition-transform duration-500"
          style={{
            transform: 'translateY(40px) scale(0.96)',
            zIndex: 0,
            opacity: 0.7,
            pointerEvents: 'none',
          }}
        >
          <img src={thirdCard.image} alt={thirdCard.title} className="w-[260px] h-[320px] object-cover rounded-xl mt-8" />
          <div className="mt-4 text-lg font-semibold">{thirdCard.title}</div>
        </div>
      )}
      {nextCard && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg z-0 border border-base-300 transition-transform duration-500 ${showNext ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-80'}`}
          style={{
            transform: 'translateY(20px) scale(0.98)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <img src={nextCard.image} alt={nextCard.title} className="w-[270px] h-[330px] object-cover rounded-xl mt-8" />
          <div className="mt-4 text-lg font-semibold">{nextCard.title}</div>
        </div>
      )}
      {topCard && (
        <div
          ref={cardRef}
          className={`absolute inset-0 flex flex-col bg-white rounded-2xl shadow-2xl z-10 border border-base-300 cursor-grab transition-transform duration-200 p-8 ${animating ? 'pointer-events-none' : ''}`}
          style={{
            transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.y/12}deg)`,
            zIndex: 2,
          }}
          onMouseDown={handleImgDragStart}
          onMouseMove={drag.isDragging ? handleImgDragMove : undefined}
          onMouseUp={handleImgDragEnd}
          onMouseLeave={drag.isDragging ? handleImgDragEnd : undefined}
          onTouchStart={handleImgDragStart}
          onTouchMove={handleImgDragMove}
          onTouchEnd={handleImgDragEnd}
        >
          <img
            src={topCard.image}
            alt={topCard.title}
            className="w-full h-[340px] items-center justify-center object-cover rounded-xl cursor-grab"
            draggable={false}
            style={{ userSelect: 'none' }}
          />
          <div className="mt-4 text-xl font-semibold">{topCard.title}</div>
          <div className="text-md text-gray-400/90">{topCard.Description}</div>
          {/* Overlay icons for swipe direction only after drag ends */}
          {swipeResult === 'right' && (
            <div className="absolute top-10 left-10 text-green-500 text-4xl font-bold opacity-80 rotate-[-15deg]">♥</div>
          )}
          {swipeResult === 'left' && (
            <div className="absolute top-10 right-10 text-red-500 text-4xl font-bold opacity-80 rotate-[15deg]">🗑️</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SwipeCards
