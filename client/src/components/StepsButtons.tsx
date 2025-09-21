import React, { useEffect, useRef } from 'react'
import { HiOutlineClipboardDocumentList, HiOutlineSparkles, HiOutlineHeart } from 'react-icons/hi2'
import QuestionsSampleImg from '../assets/Questions-sample.png'
import DetailsSample from '../assets/details-sample.png'
import SwipeSample from '../assets/Swipe-sample.png'

const PROGRESS_DURATION = 8000; // 8 seconds

function StepsButtons() {
  const [active, setActive] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const steps = [
    {
      title: 'Answer a Few Quick Questions',
      description:
        'Set your budget, preferred areas, and must‑have features. Our AI uses this to personalize your home feed.',
      Icon: HiOutlineClipboardDocumentList,
      iconColor: '#6366f1', // indigo-500
      image: QuestionsSampleImg,
      imageAlt: 'Questionnaire preview',
    },
    {
      title: 'Start Swiping Homes',
      description:
        'Swipe right to like and left to pass. Every swipe trains the AI to refine recommendations in real time.',
      Icon: HiOutlineSparkles,
      iconColor: '#6366f1', // indigo-500
      image: SwipeSample,
      imageAlt: 'Swiping homes UI',
    },
    {
      title: 'Shortlist and Decide',
      description:
        'Review your favorites, see AI‑ranked matches, compare listings, and schedule tours with a tap.',
      Icon: HiOutlineHeart,
      iconColor: '#6366f1', // indigo-500
      image: DetailsSample,
      imageAlt: 'Shortlist comparison view',
    },
  ]

  const iconBGs = ['#eef2ff', '#e0e7ff', '#c7d2fe'] // indigo-100, indigo-200, indigo-300

  // Auto-timer logic
  useEffect(() => {
    setProgress(0)
    if (timerRef.current) clearInterval(timerRef.current)
    const start = Date.now()
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.min(elapsed / PROGRESS_DURATION, 1))
      if (elapsed >= PROGRESS_DURATION) {
        setActive((prev) => (prev + 1) % steps.length)
      }
    }, 50)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, steps.length])

  // Swipe gesture state
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left
          setActive((prev) => (prev + 1) % steps.length)
        } else {
          // Swipe right
          setActive((prev) => (prev - 1 + steps.length) % steps.length)
        }
      }
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-[1000px] justify-center items-center my-auto">
      {/* Steps: horizontal scroll/swipe on mobile, vertical on desktop */}
      <div
        className="md:grid gap-7 flex md:flex-none flex-row overflow-x-auto md:overflow-visible snap-x md:snap-none"
        style={{ WebkitOverflowScrolling: 'touch' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {steps.map((s, i) => {
          const isActive = i === active
          return (
            <div
              key={s.title}
              role="button"
              tabIndex={0}
              onClick={() => setActive(i)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(i)}
              className={`grid grid-cols-[24px_56px_1fr] gap-x-4 items-start cursor-pointer p-3 rounded-xl transition
                relative min-w-[90vw] max-w-[90vw] md:min-w-0 md:max-w-none snap-center
                `}
              style={{
                marginRight: '16px',
              }}
            >
              {/* Progress bar (left) */}
              <div className="w-[6px] h-full rounded bg-gray-200 overflow-hidden mr-2 self-center relative flex flex-col justify-start">
                <div
                  style={{
                    width: '100%',
                    background: s.iconColor,
                    borderRadius: 3,
                    transition: isActive ? 'height 0.1s linear' : 'none',
                    height: isActive ? `${progress * 100}%` : '0%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              </div>
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-full grid place-items-center"
                style={{ background: iconBGs[i % iconBGs.length] }}
              >
                <s.Icon color={s.iconColor} size={28} />
              </div>
              <div>
                <h3 className="m-0 text-base md:text-lg font-semibold text-gray-900 flex items-center">
                  <span className="mr-2 text-slate-900">{i + 1}.</span>
                  {s.title}
                </h3>
                <p className="mt-1 leading-snug text-gray-600 text-xs md:text-sm">{s.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="rounded-2xl overflow-hidden border border-gray-200 grid place-items-center"
        aria-live="polite"
        style={{
          width: '100%',
          maxWidth: 620,
          height: 260,
          minHeight: 180,
          margin: '0 auto',
          background: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={steps[active].image}
          alt={steps[active].imageAlt}
          className={`block transition-transform duration-500 ease-out ${
            progress < 0.15 ? 'scale-100' : 'scale-105'
          }`}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            margin: '0 auto',
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}

export default StepsButtons
