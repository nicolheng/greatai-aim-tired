import React from 'react'
import ShortLong from '../assets/logo-short.png';

function Footer() {
  const [showProblem, setShowProblem] = React.useState(false);
  // Smooth fade-in state
  const [animateIn, setAnimateIn] = React.useState(false);

  React.useEffect(() => {
    if (showProblem) {
      const id = requestAnimationFrame(() => setAnimateIn(true));
      return () => cancelAnimationFrame(id);
    } else {
      setAnimateIn(false);
    }
  }, [showProblem]);

  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 pb-24 sm:pb-10">
  <aside>
    <img src={ShortLong} alt="Logo" className="mix-blend-multiply h-12 mb-2" />
    <p>
      AI'm Tired
      <br />
      For Great Malaysia AI Hackathon 2025
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Real Estate</a>
    <a className="link link-hover">Our AI</a>
  </nav>
  <nav>
    <h6 className="footer-title">Our Team</h6>
    <a target="_blank" href="https://www.linkedin.com/in/nicolheng0428/" className="link link-hover">Nicol Heng Si Yi</a>
    <a target="_blank" href='https://my.linkedin.com/in/kan-penny-a5a057275' className="link link-hover">Kan Penny</a>
    <a target="_blank" href="https://www.linkedin.com/in/valencien-seow-yun-sun/" className="link link-hover">Valencien Seow Yun Sun</a>
    <a target="_blank" href="https://www.linkedin.com/in/ivan-lai-52175826b/" className="link link-hover">Ivan Lai Yao En</a>
    <a target="_blank" href="https://www.linkedin.com/in/iven-nyam-068068315/" className="link link-hover">Iven Nyam Jia Yang</a>
  </nav>
  <nav>
    <h6 className="footer-title">Problem Statement</h6>
    {/* Trigger overlay instead of navigating */}
    <button type="button" className="link link-hover" onClick={() => setShowProblem(true)}>
      Problem Statement
    </button>
  </nav>

  {/* Overlay */}
  {showProblem && (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-base-300/60 transition-opacity duration-300 ease-out ${animateIn ? 'opacity-100' : 'opacity-0'}`}
      onClick={() => setShowProblem(false)}
    >
      <div
        className={`bg-base-100 text-base-content rounded-box max-w-3xl w-[92%] p-6 shadow-xl max-h-[85vh] md:pb-0 pb-24 sm:pb-10 overflow-y-auto transform transition-all duration-300 ease-out ${animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-3">Problem Statement</h2>
        <p className="mb-4">
          Property developers and agents collect large amounts of customer data from events, campaigns, inquiries, and social media, yet still face challenges such as unsold units, low conversion rates, and difficulty matching buyers to the right properties. Buyers, meanwhile, experience fragmented journeys with irrelevant promotions, limited guidance, and lack of personalized recommendations.
        </p>
        <h3 className="text-xl font-semibold mb-2">Challenges</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Data Overload – Customer information is collected and stored in databases, but insights are limited due to lack of effective analysis and reporting.
          </li>
          <li>
            Generic Campaigns and Ads – Marketing campaigns and advertisements are often broad and untargeted, missing the right audience and reducing conversion rates.
          </li>
          <li>
            Limited Search for Buyers – Buyers struggle to find properties that meet specific requirements (e.g., pet-friendly condos, quiet neighbourhoods, proximity to amenities).
          </li>
          <li>
            Fragmented Customer Journey – Buyers receive inconsistent or irrelevant communications across channels, making it hard to navigate from interest to purchase.
          </li>
          <li>
            Inefficient Lead Prioritization – Developers and agents have difficulty identifying high-potential buyers from large datasets, leading to wasted effort and missed sales opportunities
          </li>
        </ol>
        <div className="mt-6 text-right">
          <button type="button" className="btn btn-ghost" onClick={() => setShowProblem(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</footer>
  )
}

export default Footer
