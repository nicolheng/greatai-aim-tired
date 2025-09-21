import React from 'react'

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
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <aside>
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      className="fill-current">
      <path
        d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
    </svg>
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
        className={`bg-base-100 text-base-content rounded-box max-w-3xl w-[92%] p-6 shadow-xl max-h-[85vh] overflow-y-auto transform transition-all duration-300 ease-out ${animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}
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
