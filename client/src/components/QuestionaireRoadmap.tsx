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
    <ul className="steps steps-vertical">
      {steps.map((label, idx) => (
        <li key={label} className={`step${idx < currentStep ? ' step-primary' : idx === currentStep ? ' step-primary' : ''}`}>{label}</li>
      ))}
    </ul>
  )
}

export default QuestionaireRoadmap
