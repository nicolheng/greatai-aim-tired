import Map from './Map';
import CardCarousel from './CardCarousel';

import React from 'react';
import { useState, useEffect, useCallback } from 'react';

function FocusedFav() {
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


    return (
    <>
    <div className="flex flex-col w-[90vw] min-h-screen justify-self-center bg-base-200 p-10 mt-10">
        <div className="relative justify-center w-full h-[70vh] ">
            <CardCarousel />
            <div className="absolute flex bottom-0 right-0 w-[15vw] h-[10vw] bg-cyan-200 z-2 mb-4 mr-4 overflow-hidden justify-center items-center place-items-center m-auto">
                <Map isIdle={isIdle} setZoom={15.3} setPitch={70}/>
            {/* add newLocation coords into Map when backend provides */}
            </div> 
        </div>
        <div className="flex w-full h-auto">
            <div className=" w-full h-auto grid grid-row items-start justify-start text-white text-2xl p-4">
                <h2 className="row-span-1 font-bold text-black">Eiffel Tower</h2>
                <h4 className="row-span-4 text-base text-black">Description</h4>
            </div>
            <div className=" w-full h-auto flex items-start justify-start grid grid-row text-white text-2xl pl-4 pt-4">
                <h2 className="row-span-1 text-black text-lg font-bold">Attributes</h2>
                <div className="row-span-1 grid grid-cols-5 text-base pb-4">
                    <div className="text-black">1</div>
                    <div className="text-black">1</div>
                    <div className="text-black">1</div>
                    <div className="text-black">1</div>
                    <div className="text-black">1</div>
                    <div className="text-black">1</div>
                </div>
            </div>
        </div>
        <div className=" w-full h-16 flex items-start justify-start text-white text-2xl mt-1 p-4">
            <h4 className="text-base text-black">Nearest Hospital, schools, grocery shopping, malls</h4>
        </div>
        <div className=" w-full h-auto flex items-start justify-start text-white text-2xl mt-1 p-4">
            <h4 className="text-base text-black">Agent contacts and other useful info</h4>
        </div>
    </div>
    </>
    )
}

export default FocusedFav