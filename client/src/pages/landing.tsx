import LogoCarousel from "../components/carousel"
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LuBrain } from "react-icons/lu";
import { FaTired } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import pic1 from "../assets/questionare_sample.png";
import pic2 from "../assets/tinder_card_sample.png";
import pic3 from "../assets/3d_map_sample.png";

function Landing () {
    return (
        <>
        {/* Landing page title */}
        <div className="flex items-center justify-start p-5 badge badge-lg bg-purple-200 place-self-center mt-8 mb-0 gap-2">
            <div><span className="bg-purple-50 m-2 w-max h-8 font-bold badge opacity-80"><HiOutlineSpeakerphone />Announcement</span></div>
            <span className="ml-2 mr-4">Introducing FRESTATE.ai</span>
        </div>

        <div className="w-full h-64 bg-base items-center justify-center flex flex-col">
            <h1 className="text-7xl font-bold">FR ESTATE</h1>
            <p className="text-gray-600 text-xl mt-6">Buyers find homes faster, agents sell smarter</p>
        </div>

        {/* Main content */}
        <div className="flex w-full items-center justify-center mt-8"><button className="bg-indigo-500 text-white py-2 px-4 rounded">Get Started</button></div>
        <div className="flex w-full items-center justify-center mt-4"><p className="text-gray-600 italic">Finding your dream home has never been easier.</p></div>

        {/* Video demo */}
        <div className="flex w-full h-[40rem] items-center justify-center mt-12 pl-20 pr-20"><p className="w-full h-full bg-gray-300 text-gray-600 rounded-xl">video demo</p></div>
        
        {/* Logo carousel */}
        <div className="flex flex-col w-full items-center justify-center mt-10 mb-10 gap-6">
            <h2 className="text-4xl font-bold mb-8">Our Tools</h2>
            <LogoCarousel />
        </div>

        {/* Problem Section */}
        <div className="w-full h-110 items-center justify-center flex flex-col mt-16 p-8">
            <h4 className="text-xm">Problem Statements</h4>
            <h2 className="text-4xl font-bold mt-4">Understanding the Challenges</h2>
            <div className="grid grid-cols-3 gap-8 w-full h-full p-4 mt-4">
                <div className="w-full h-64 p-4 text-xl flex flex-col justify-center">
                    <span className="text-gray-600 gap-2 flex-wrap pb-4 pt-4 px-2 py-1 mb-4 inline-flex items-center rounded-md bg-pink-400/10 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/30">
                        <FaTired /> Decision Fatigue
                    </span>
                    <span>Suffocating in generic listing and endless visiting. Agents and buyers are often overwhelmed by the sheer volume of options.</span>
                </div>
                <div className="w-full h-64 p-4 text-xl flex flex-col justify-center">
                    <span className="text-gray-600 gap-2 flex-wrap pb-4 pt-4 px-2 py-1 mb-4 inline-flex items-center rounded-md bg-pink-400/10 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/30">
                        <FaQuestion /> Inexperienced Agents' Guessing Games
                    </span>
                    <span>Weak targeting causes low conversion. Agents often rely on intuition rather than data-driven insights.</span>
                </div>
                <div className="w-full h-64 p-4 text-xl flex flex-col justify-center">
                    <span className="text-gray-600 gap-2 flex-wrap pb-4 pt-4 px-2 py-1 mb-4 inline-flex items-center rounded-md bg-pink-400/10 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/30">
                        <LuBrain /> Data Overload
                    </span>
                    <span>Trapped cash flow and noisy market feedback. Agents struggle to find usable insights amidst the chaos.</span>
                </div>
            </div>
        </div>

        {/* Solution Section */}
        <div className="w-full h-240 items-center justify-center flex flex-col mt-8 mb-8 p-4">
            <h4 className="text-xm">Our Solution</h4>
            <h2 className="text-4xl font-bold mt-4">Growing Stronger with Organized Data</h2>
            <div className="grid grid-cols-3 gap-8 w-full h-200 p-8 pt-2 mt-4">
                <div className="flex flex-col w-full h-[105vh] bg-blue-50 rounded-xl p-4 row-span-2">
                    <span className="pb-2 pt-4 text-gray-600 font-bold">Asking Questions With Intents</span>
                    <span className="pt-2 text-gray-500">Tailor our AI to understand your specific needs and preferences, allowing you to receive personalized recommendations.</span>
                    <div className="mt-auto mb-4 bg-gray-300 rounded-xl"><img src={pic1} alt="A Demo Picture of the Questionnaire" className=" rounded-xl" /></div>
                </div>
                <div className="flex flex-col w-full h-[50vh] bg-blue-50 rounded-xl col-span-2">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col pl-4 pb-4 pt-4">
                            <span className="pb-2 pt-2 pl-2 text-gray-600 font-bold">Swipe Right For Your Favourite Ones</span>
                            <span className="pt-2 pl-2 text-gray-500">We prioritize in giving the best recommendations based on your preferences.</span>
                        </div>
                        <div className="mt-auto ml-auto mr-auto w-auto h-auto bg-gray-300 rounded-xl p-0"><img src={pic2} alt="A Demo Picture of the Tinder Card System" className="w-auto h-[45vh] rounded-xl" /></div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-[50vh] bg-blue-50 rounded-xl p-4 col-span-2">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col">
                            <span className="pb-2 pt-4 pl-2 text-gray-600 font-bold">3D Visualization of Points of Interest Nearby</span>
                            <span className="pt-2 pl-2 text-gray-500">We provide immersive 3D visualizations to help you explore and understand your surroundings better.</span>
                        </div>
                        <div className="mt-auto w-full h-auto bg-gray-300 rounded-xl"><img src={pic3} alt="A Demo Picture of the 3D Map" className="w-auto h-[42vh] object-cover rounded-xl" /></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Call to Action Section */}
        <div className="w-full h-100 bg-gray-200 items-center justify-center flex flex-col mt-8 mb-8">
            <h1 className="text-4xl font-bold">Call to Action Section</h1>
            <div className="grid grid-cols-2 gap-8 w-full h-full p-8 pt-2 mt-4">
                <div className="bg-gray-300 w-full h-auto p-4">Problem 1</div>
                <div className="bg-gray-300 w-full h-auto p-4">Problem 2</div>
            </div>
        </div>

        {/* Footer */}
        <div className="w-full h-82 bg-gray-200 items-center justify-center flex flex-col mt-8">
            <h1 className="text-4xl font-bold">Footer</h1>
            <p className="text-gray-600 mt-8">AI'm Tired</p>
        </div>
        </>
    )
}

export default Landing