import { motion } from 'framer-motion'
import React, {useEffect, useState} from 'react'

interface CarouselProps {
  src: string;
  alt: string;
  href ?: string;
}

const logos: CarouselProps[] = [
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
    { src: "../vite.svg", alt: "OpenAI" },
]

function LogoCarousel () {
    const [isPaused, setIsPaused] = useState(false);
    const duplicatedLogos = [...logos, ...logos]; // Duplicate logos for seamless looping
    const scrollDuration = 10; // Duration for one full scroll in seconds

    return (
        <div className="overflow-hidden whitespace-nowrap w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: isPaused ? 0 : [0, 360] }}
                transition={{ duration: scrollDuration, ease: "linear", repeat: Infinity }}
            >
                {duplicatedLogos.map((logo, index) => (
                    <div key={index} className="flex-shrink-0 w-32 h-32 p-4">
                        <img src={logo.src} alt={logo.alt} className="h-full object-contain grayscale hover:grayscale-0" />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export default LogoCarousel;
