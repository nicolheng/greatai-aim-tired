import React, { useState } from 'react'
import QuestionaireRoadmap from '../components/QuestionaireRoadmap'
import Sidebar from '../components/Sidebar'

import Dock from '../components/Dock';

function Questionnaire() {
  // State for answers
  const [answers, setAnswers] = useState({
    livingArrangement: '',
    numPeople: '',
    doYouCook: '',
    wantQuiet: '',
    preferredLocation: '',
    priceRange: '',
    facilities: '',
    landedOrHighRise: '',
  });

  // Each main question can have multiple subquestions
  const questions = [
    {
      label: 'Living Arrangement?',
      subQuestions: [

        {
          label: 'Living arrangement?',
          content: (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Alone', 'With family', 'For my parents', 'Tenant'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${answers.livingArrangement === option ? 'btn-active' : ''}`}>
                  <input
                    type="radio"
                    name="livingArrangement"
                    className="hidden"
                    value={option}
                    checked={answers.livingArrangement === option}
                    onChange={() => setAnswers(a => ({ ...a, livingArrangement: option }))}
                  />
                  {option}
                </label>
              ))}

            </div>
          ),
        },
        {
          label: 'Number of people?',

          content: (
            <input
              className="input input-bordered w-full"
              placeholder="Enter number"
              type="number"
              value={answers.numPeople}
              onChange={e => setAnswers(a => ({ ...a, numPeople: e.target.value }))}
            />
          ),

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

              {['Yes', 'No'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${answers.doYouCook === option ? 'btn-active' : ''}`}>
                  <input
                    type="radio"
                    name="doYouCook"
                    className="hidden"
                    value={option}
                    checked={answers.doYouCook === option}
                    onChange={() => setAnswers(a => ({ ...a, doYouCook: option }))}
                  />
                  {option}
                </label>
              ))}
            </div>
          ),
        },
        {
          label: 'Do you want somewhere quiet?',
          content: (
            <div className="grid grid-cols-2 gap-4">

              {['Yes', 'No'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${answers.wantQuiet === option ? 'btn-active' : ''}`}>
                  <input
                    type="radio"
                    name="wantQuiet"
                    className="hidden"
                    value={option}
                    checked={answers.wantQuiet === option}
                    onChange={() => setAnswers(a => ({ ...a, wantQuiet: option }))}
                  />
                  {option}
                </label>
              ))}

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

          content: (
            <input
              className="input input-bordered w-full"
              placeholder="Enter location"
              value={answers.preferredLocation}
              onChange={e => setAnswers(a => ({ ...a, preferredLocation: e.target.value }))}
            />
          ),

        },
      ],
    },
    {
      label: 'Price range?',
      subQuestions: [
        {
          label: 'Price range?',

          content: (
            <input
              className="input input-bordered w-full"
              placeholder="Enter price range"
              value={answers.priceRange}
              onChange={e => setAnswers(a => ({ ...a, priceRange: e.target.value }))}
            />
          ),
        },
      ],
    },
    {
      label: 'Facilities you may need?',
      subQuestions: [
        {
          label: 'Facilities you may need?',

          content: (
            <input
              className="input input-bordered w-full"
              placeholder="e.g. gym, pool, security"
              value={answers.facilities}
              onChange={e => setAnswers(a => ({ ...a, facilities: e.target.value }))}
            />
          ),

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

              {['Landed', 'High-rise'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${answers.landedOrHighRise === option ? 'btn-active' : ''}`}>
                  <input
                    type="radio"
                    name="landedOrHighRise"
                    className="hidden"
                    value={option}
                    checked={answers.landedOrHighRise === option}
                    onChange={() => setAnswers(a => ({ ...a, landedOrHighRise: option }))}
                  />
                  {option}
                </label>
              ))}

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

    <div className="min-h-screen w-full flex flex-col sm:flex-row bg-base-200">
      <Sidebar />
      <Dock/>
      {/* Roadmap/Sidebar */}
      <div className="w-full sm:w-1/3 bg-base-200 p-4 sm:p-10 flex flex-col justify-center">
        <div>
          <div className="font-bold text-lg mb-2 ">FRestate</div>

          <h2 className="text-2xl font-bold mb-2">Find your perfect home</h2>
          <p className="text-base-content/70 mb-8">Answer a few questions to help us recommend the best property for you.</p>
          <QuestionaireRoadmap currentStep={mainStep} />
        </div>
      </div>
      {/* Main Content */}

      <div className="flex-1 flex flex-col justify-center items-center px-2 py-4 sm:px-10 sm:py-8 bg-base-100 overflow-auto pb-20">
        <div className="w-full max-w-xl sm:max-w-2xl">
          <div key={fadeKey} className="animate-fadein">
            {currentMain.subQuestions.map((sub, idx) => (
              <div className="mb-8" key={idx}>
                <div className="text-base sm:text-lg font-semibold mb-2">{sub.label}</div>

                {sub.content}
              </div>
            ))}
          </div>
          {/* Navigation buttons only appear once here */}

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <button className="btn bg-base-100 w-full sm:w-auto" disabled={isFirst} onClick={handleBack}>Back</button>
            {isLast ? (
              <button className="btn btn-primary w-full sm:w-auto" onClick={() => {window.location.href = '/tinder';}}>Finish</button>
            ) : (
              <button className="btn btn-base-300 w-full sm:w-auto" onClick={handleNext}>Next</button>

            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire
