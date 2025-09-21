import LogoCarousel from "../components/LogoCarousel"
import Sidebar from "../components/Sidebar"
import Dock from "../components/Dock"
import Footer from "../components/Footer"
import StepsButtons from "../components/StepsButtons"
import LandingBG from "../components/LandingBG"
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LuBrain } from "react-icons/lu";
import { FaTired } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import pic1 from "../assets/questionare_sample.png";
import pic2 from "../assets/tinder_card_sample.png";
import pic3 from "../assets/3d_map_sample.png";

import axios from "axios";
import { useEffect , useState } from "react"

function Landing () {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Fetch properties from the backend API - test with simpler endpoint first
        axios.get('http://localhost:5000/api/properties/sale-4377301')
            .then(response => {
                console.log('API Response:', response.data);
                setProperties(response.data.properties || []);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
                console.error('Error details:', error.response?.data);
            });
    }, []);

    return (
        <>
        <Dock />
        <Sidebar />
        <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
            {/* Landing page title */}
            <div className="flex flex-col sm:flex-row items-center justify-start p-3 sm:p-5 badge badge-lg bg-purple-200 place-self-center mt-8 mb-0 gap-2">
                <div><span className="bg-purple-50 m-2 w-max h-8 font-bold badge opacity-80"><HiOutlineSpeakerphone />Announcement</span></div>
                <span className="ml-2 mr-4">Introducing FRESTATE.ai</span>
            </div>

            <div className="w-full h-100 bg-base items-center justify-center flex flex-col">
                <h1 className="text-4xl sm:text-7xl font-bold text-center">FR ESTATE</h1>
                <p className="text-gray-600 text-lg sm:text-xl mt-4 sm:mt-6 text-center">Buyers find homes faster, agents sell smarter</p>
                {/* Main content */}
                <div className="flex w-full items-center justify-center mt-6 sm:mt-8">
                    <button className="bg-indigo-500 text-white btn btn-primary hover:bg-indigo-700 transition-all w-xs max-w-xs  sm:max-w-none">Get Started</button>
                </div>
            </div>

            <div className="flex w-full items-center justify-center mt-4">
                <p className="text-gray-600 italic text-center">Finding your dream home has never been easier.</p>
            </div>
        </div>

        {/* Video demo */}
        <div className="flex w-full h-60 sm:h-[40rem] items-center justify-center mt-8 sm:mt-12 px-2 sm:pl-20 sm:pr-20">
            <p className="w-full h-full bg-gray-300 text-gray-600 rounded-xl flex items-center justify-center">video demo</p>
        </div>
        
        {/* Logo carousel */}
        <div className="flex flex-col w-full items-center justify-center mt-10 mb-10 gap-4 sm:gap-6">
            <h2 className="text-2xl sm:text-4xl font-bold">Our Tools</h2>
            <LogoCarousel />
        </div>

        {/* Problem Section */}
        <div className="w-full items-center justify-center flex flex-col mt-12 sm:mt-16 p-2 sm:p-8">
            <h4 className="text-xm">Problem Statements</h4>
            <h2 className="text-2xl sm:text-4xl font-bold mt-2 sm:mt-4 text-center">Understanding the Challenges</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 w-full h-full p-2 sm:p-4 mt-4">
                <div className="w-full h-44 sm:h-64 p-2 sm:p-4 text-base sm:text-xl flex flex-col justify-center">
                    <span className="text-gray-600 gap-2 flex-wrap pb-2 sm:pb-4 pt-2 sm:pt-4 px-2 py-1 mb-2 sm:mb-4 inline-flex items-center rounded-md bg-pink-400/10 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/30">
                        <FaTired /> Decision Fatigue
                    </span>
                    <span>Suffocating in generic listing and endless visiting. Agents and buyers are often overwhelmed by the sheer volume of options.</span>
                </div>
                <div className="w-full h-44 sm:h-64 p-2 sm:p-4 text-base sm:text-xl flex flex-col justify-center">
                    <span className="text-gray-600 gap-2 flex-wrap pb-2 sm:pb-4 pt-2 sm:pt-4 px-2 py-1 mb-2 sm:mb-4 inline-flex items-center rounded-md bg-pink-400/10 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/30">
                        <FaQuestion /> Inexperienced Agents' Guessing Games
                    </span>
                    <span>Weak targeting causes low conversion. Agents often rely on intuition rather than data-driven insights.</span>
                </div>
                <div className="w-full h-44 sm:h-64 p-2 sm:p-4 text-base sm:text-xl flex flex-col justify-center">
                    <span className="text-gray-600 gap-2 flex-wrap pb-2 sm:pb-4 pt-2 sm:pt-4 px-2 py-1 mb-2 sm:mb-4 inline-flex items-center rounded-md bg-pink-400/10 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/30">
                        <LuBrain /> Data Overload
                    </span>
                    <span>Trapped cash flow and noisy market feedback. Agents struggle to find usable insights amidst the chaos.</span>
                </div>
            </div>
        </div>

        {/* Solution Section */}
        <div className="w-full items-center justify-center flex flex-col mt-8 mb-8 p-2 sm:p-4">
            <h4 className="text-xm">Our Solution</h4>
            <h2 className="text-2xl sm:text-4xl font-bold mt-2 sm:mt-4 text-center">Growing Stronger with Organized Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 w-full h-auto sm:h-200 p-2 sm:p-8 pt-2 mt-4">
                <div className="flex flex-col w-full h-80 sm:h-[105vh] bg-blue-50 rounded-xl p-2 sm:p-4 row-span-2">
                    <span className="pb-2 pt-2 sm:pt-4 text-gray-600 font-bold">Asking Questions With Intents</span>
                    <span className="pt-2 text-gray-500">Tailor our AI to understand your specific needs and preferences, allowing you to receive personalized recommendations.</span>
                    <div className="mt-auto mb-2 sm:mb-4 bg-gray-300 rounded-xl">
                        <img src={pic1} alt="A Demo Picture of the Questionnaire" className="rounded-xl w-full h-40 sm:h-auto object-cover" />
                    </div>
                </div>
                <div className="flex flex-col w-full h-60 sm:h-[50vh] bg-blue-50 rounded-xl col-span-1 sm:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4">
                        <div className="flex flex-col pl-2 sm:pl-4 pb-2 sm:pb-4 pt-2 sm:pt-4">
                            <span className="pb-2 pt-2 pl-2 text-gray-600 font-bold">Swipe Right For Your Favourite Ones</span>
                            <span className="pt-2 pl-2 text-gray-500">We prioritize in giving the best recommendations based on your preferences.</span>
                        </div>
                        <div className="mt-auto ml-auto mr-auto w-full sm:w-auto h-36 sm:h-auto bg-gray-300 rounded-xl p-0 flex items-center justify-center">
                            <img src={pic2} alt="A Demo Picture of the Tinder Card System" className="w-full sm:w-auto h-36 sm:h-[45vh] rounded-xl object-cover" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-60 sm:h-[50vh] bg-blue-50 rounded-xl p-2 sm:p-4 col-span-1 sm:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4">
                        <div className="flex flex-col">
                            <span className="pb-2 pt-2 sm:pt-4 pl-2 text-gray-600 font-bold">3D Visualization of Points of Interest Nearby</span>
                            <span className="pt-2 pl-2 text-gray-500">We provide immersive 3D visualizations to help you explore and understand your surroundings better.</span>
                        </div>
                        <div className="mt-auto w-full h-36 sm:h-auto bg-gray-300 rounded-xl flex items-center justify-center">
                            <img src={pic3} alt="A Demo Picture of the 3D Map" className="w-full sm:w-auto h-36 sm:h-[42vh] object-cover rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Call to Action Section */}
        <div className="w-full h-full py-6 sm:py-8 items-center justify-center flex flex-col mt-8 mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-center pb-4 sm:pb-8">With just a few simple steps</h1>
            <StepsButtons />
        </div>

        {/* Footer */}
        <Footer />
        </>
    )
}

export default Landing