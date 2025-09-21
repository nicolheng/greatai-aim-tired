import React from 'react'

type Props = {
  currentStep?: number
}

const steps = [
  'Living Arrangement',
  'Do you want somewhere quiet',
  'Preferred location',
  'Price range',
  'Facilities you may need',
  'Landed or high-rise',
]

function QuestionaireRoadmap({ currentStep = 0 }: Props) {
  return (
    <ul className="steps md:steps-vertical steps-horizontal max-w-80">
      {steps.map((label, idx) => (
        <li key={label} className={`step ${idx < currentStep ? 'step-primary' : idx === currentStep ? 'step-primary' : ''} lg:step-label`}>
          <span className="hidden lg:block">{label}</span>
        </li>
      ))}
    </ul>
  )
}

export default QuestionaireRoadmap
