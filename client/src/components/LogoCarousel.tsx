import { motion, animate, useMotionValue } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

interface CarouselProps {
  src: string;
  alt: string;
  href ?: string;
}

const logos: CarouselProps[] = [
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    
]

function LogoCarousel () {
	const [isPaused, setIsPaused] = useState(false)
	const x = useMotionValue(0)
	const trackRef = useRef<HTMLDivElement | null>(null)
	const controlsRef = useRef<ReturnType<typeof animate> | null>(null)
	const halfWidthRef = useRef(0)
	const durationSec = 100 // seconds for one full half-loop

	// Measure half of the full duplicated content width
	useEffect(() => {
		const measure = () => {
			if (!trackRef.current) return
			const total = trackRef.current.scrollWidth
			halfWidthRef.current = total / 2
		}
		measure()
		window.addEventListener('resize', measure)
		return () => window.removeEventListener('resize', measure)
	}, [])

	// Loop animation from current x to -halfWidth then reset to 0 and continue
	const startLoop = () => {
		if (!halfWidthRef.current) return
		const from = x.get()
		const to = -halfWidthRef.current
		// Maintain constant speed based on durationSec for a full half-loop
		const pxPerSec = halfWidthRef.current / durationSec
		const distance = Math.abs(to - from)
		const duration = distance / pxPerSec || 0.001

		controlsRef.current = animate(x, to, {
			duration,
			ease: 'linear',
		})

		controlsRef.current.then(() => {
			// snap back to start without visual jump (content is duplicated)
			x.set(0)
			startLoop()
		})
	}

	// Start loop on mount
	useEffect(() => {
		startLoop()
		return () => controlsRef.current?.stop()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div
			className="relative w-full overflow-hidden"
			onMouseEnter={() => {
				setIsPaused(true)
				controlsRef.current?.stop() // pause at current position
			}}
			onMouseLeave={() => {
				setIsPaused(false)
				startLoop() // resume from current position
			}}
		>
			<motion.div className="will-change-transform" style={{ x }}>
				<div ref={trackRef} className="flex w-max gap-6">
					{/* Track A */}
					<div className="flex items-center gap-6">
						{logos.map((logo, idx) => (
							<div key={`a-${idx}`} className="flex-shrink-0 w-32 h-16 p-2">
								<img
									src={logo.src}
									alt={logo.alt}
									className="h-full object-contain grayscale hover:grayscale-0 transition"
								/>
							</div>
						))}
					</div>
					{/* Track B (duplicate for seamless loop) */}
					<div className="flex items-center gap-6">
						{logos.map((logo, idx) => (
							<div key={`b-${idx}`} className="flex-shrink-0 w-32 h-16 p-2">
								<img
									src={logo.src}
									alt={logo.alt}
									className="h-full object-contain grayscale hover:grayscale-0 transition"
								/>
							</div>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default LogoCarousel;