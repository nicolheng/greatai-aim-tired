import React, { useState } from 'react'
import QuestionaireRoadmap from '../components/QuestionaireRoadmap'
import Sidebar from '../components/Sidebar'

function Questionnaire() {
  // Each main question can have multiple subquestions
  const questions = [
    {
      label: 'Living Arrangement?',
      subQuestions: [

        {
          label: 'Living arrangement?',
          content: (
            <div className="grid grid-cols-4 gap-4">
              <button className="btn btn-outline h-20">Alone</button>
              <button className="btn btn-outline h-20">With family</button>
              <button className="btn btn-outline h-20">For my parents</button>
              <button className="btn btn-outline h-20">Tenant</button>
            </div>
          ),
        },
        {
          label: 'Number of people?',
          content: <input className="input input-bordered w-full" placeholder="Enter number" />,
        },        
      ],
    },
    {
      label: 'Do you cook?',
      subQuestions: [
        {
          label: 'Do you cook?',
          content: (
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-outline h-20">Yes</button>
              <button className="btn btn-outline h-20">No</button>
            </div>
          ),
        },
        {
          label: 'Do you want somewhere quiet?',
          content: (
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-outline h-20">Yes</button>
              <button className="btn btn-outline h-20">No</button>
            </div>
          ),
        },
      ],
    },
    {
      label: 'Preferred location?',
      subQuestions: [
        {
          label: 'Preferred location?',
          content: <input className="input input-bordered w-full" placeholder="Enter location" />,
        },
      ],
    },
    {
      label: 'Price range?',
      subQuestions: [
        {
          label: 'Price range?',
          content: <input className="input input-bordered w-full" placeholder="Enter price range" />,
        },
      ],
    },
    {
      label: 'Facilities you may need?',
      subQuestions: [
        {
          label: 'Facilities you may need?',
          content: <input className="input input-bordered w-full" placeholder="e.g. gym, pool, security" />,
        },
      ],
    },
    {
      label: 'Landed or high-rise?',
      subQuestions: [
        {
          label: 'Landed or high-rise?',
          content: (
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-outline h-20">Landed</button>
              <button className="btn btn-outline h-20">High-rise</button>
            </div>
          ),
        },
      ],
    },
  ];


  const [mainStep, setMainStep] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const currentMain = questions[mainStep];
  const isFirst = mainStep === 0;
  const isLast = mainStep === questions.length - 1;

  function handleNext() {
    if (mainStep < questions.length - 1) {
      setMainStep(m => m + 1);
      setFadeKey(k => k + 1);
    }
  }

  function handleBack() {
    if (mainStep > 0) {
      setMainStep(m => m - 1);
      setFadeKey(k => k + 1);
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-base-200">
      <Sidebar />
      {/* Roadmap/Sidebar */}
      <div className="w-1/3 bg-base-200 p-10 flex flex-col justify-center">
        <div>
          <div className="font-bold text-lg mb-2">Site Name Bro</div>
          <h2 className="text-2xl font-bold mb-2">Find your perfect home</h2>
          <p className="text-base-content/70 mb-8">Answer a few questions to help us recommend the best property for you.</p>
          <QuestionaireRoadmap currentStep={mainStep} />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-10 py-8 bg-base-100 overflow-auto">
        <div className="w-full max-w-2xl">
          <div key={fadeKey} className="animate-fadein">
            {currentMain.subQuestions.map((sub, idx) => (
              <div className="mb-8" key={idx}>
                <div className="text-lg font-semibold mb-2">{sub.label}</div>
                {sub.content}
              </div>
            ))}
          </div>
          {/* Navigation buttons only appear once here */}
          <div className="flex justify-between mt-8">
            <button className="btn bg-base-100" disabled={isFirst} onClick={handleBack}>Back</button>
            {isLast ? (
              <button className="btn btn-primary" onClick={() => {window.location.href = '/tinder';}}>Finish</button>
            ) : (
              <button className="btn btn-base-300" onClick={handleNext}>Next</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire
