import LogoCarousel from "../components/LogoCarousel"
import Sidebar from "../components/Sidebar"
import Dock from "../components/Dock"
import Footer from "../components/Footer"
import StepsButtons from "../components/StepsButtons"

function Landing () {
    return (
        <>
        <Dock />
        <Sidebar />
        {/* Landing page title */}
        <div className="w-full h-64 bg-base items-center justify-center flex flex-col m-8">
            <h1 className="text-7xl font-bold">Landing Page</h1>
            <p className="text-gray-600 mt-8">Small Description</p>
        </div>

        {/* Main content */}
        <div className="flex w-full items-center justify-center mt-8"><button className="bg-indigo-500 text-white py-2 px-4 rounded">Get Started</button></div>
        <div className="flex w-full items-center justify-center mt-4"><p className="text-gray-600">small trial text</p></div>

        {/* Video demo */}
        <div className="flex w-full h-[40rem] items-center justify-center mt-12 pl-20 pr-20"><p className="w-full h-full bg-gray-300 text-gray-600">video demo</p></div>
        
        {/* Logo carousel */}
        <div className="flex flex-col w-full items-center justify-center mt-10 mb-10 gap-6">
            <h2 className="text-4xl font-bold">Our Tools</h2>
            <LogoCarousel />
        </div>

        {/* Problem Section */}
        <div className="w-full h-110 bg-gray-200 items-center justify-center flex flex-col mt-8 p-8">
            <h1 className="text-4xl font-bold">Problem Section</h1>
            <div className="grid grid-cols-3 gap-4 w-full h-full p-4 mt-4">
                <div className="bg-gray-300 w-full h-64 p-4">Problem 1</div>
                <div className="bg-gray-300 w-full h-64 p-4">Problem 2</div>
                <div className="bg-gray-300 w-full h-64 p-4">Problem 3</div>
            </div>
        </div>

        {/* Solution Section */}
        <div className="w-full h-168 bg-gray-200 items-center justify-center flex flex-col mt-8 mb-8">
            <h1 className="text-4xl font-bold">Solution Section</h1>
            <div className="grid grid-cols-2 gap-8 w-full h-full p-8 pt-2 mt-4">
                <div className="bg-gray-300 w-full h-auto p-4 row-span-2">Problem 1</div>
                <div className="bg-gray-300 w-full h-auto p-4">Problem 2</div>
                <div className="bg-gray-300 w-full h-auto p-4">Problem 3</div>
            </div>
        </div>

        {/* Call to Action Section */}
        <div className="w-full h-full py-8 items-center justify-center flex flex-col mt-8 mb-8">
            <h1 className="text-4xl font-bold text-cen pb-8">With just a few simple steps</h1>
                <StepsButtons />

        </div>

        {/* Footer */}
        <Footer />
        </>
    )
}

export default Landing
