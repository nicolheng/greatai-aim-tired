import React, { useState } from 'react';
import axios from 'axios';
import QuestionaireRoadmap from '../components/QuestionaireRoadmap'
import Sidebar from '../components/Sidebar'
import Dock from '../components/Dock';
import SwipeCards from '../components/SwipeCards';

// Define the structure of the API response
interface Property {
  id: string;
  title: string;
  cover: {
    url: string;
  };
  prices: {
    min?: number;
  }[];
  address: {
    formattedAddress: string;
    lat: number;
    lng: number;
  };
}

function Questionnaire() {
  // State for answers
  const [answers, setAnswers] = useState({
    household_type: '',
    budget: { min: '', max: '' },
    preferred_locations: [] as string[],
    property_type: [] as string[],
    bedrooms_min: '',
    bathrooms_min: '',
    floor_area: { min: '', max: '' },
    parking_spaces_min: '',
    amenities_required: [] as string[],
    building_preference: '',
    near_public_transport: '',
    environment_preference: '',
    near_schools: '',
  });

  // Each main question can have multiple subquestions
  const questions = [
    {
      label: 'Household Information',
      subQuestions: [
        {
          label: 'Who will be living in the house?',
          content: (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['alone', 'family', 'parents'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${answers.household_type === option ? 'btn-active' : ''}`}>
                  <input
                    type="radio"
                    name="household_type"
                    className="hidden"
                    value={option}
                    checked={answers.household_type === option}
                    onChange={() => setAnswers(a => ({ ...a, household_type: option }))}
                  />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      label: 'Budget',
      subQuestions: [
        {
          label: 'What is your maximum budget per month (RM)?',
          content: (
            <div className="grid grid-cols-2 gap-4">
              <input
                className="input input-bordered w-full"
                placeholder="Min budget"
                type="number"
                value={answers.budget.min}
                onChange={e => setAnswers(a => ({ ...a, budget: { ...a.budget, min: e.target.value } }))}
              />
              <input
                className="input input-bordered w-full"
                placeholder="Max budget"
                type="number"
                value={answers.budget.max}
                onChange={e => setAnswers(a => ({ ...a, budget: { ...a.budget, max: e.target.value } }))}
              />
            </div>
          ),
        },
      ],
    },
    {
      label: 'Location & Property Type',
      subQuestions: [
        {
          label: 'Preferred location(s)?',
          content: (
            <input
              className="input input-bordered w-full"
              placeholder="e.g. Downtown, Subang Jaya (comma separated)"
              value={Array.isArray(answers.preferred_locations) ? answers.preferred_locations.join(', ') : ''}
              onChange={e => setAnswers(a => ({ ...a, preferred_locations: e.target.value.split(',').map(s => s.trim()).filter(s => s) }))}
            />
          ),
        },
        {
          label: 'What type of property are you looking for?',
          content: (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['apartment', 'condo', 'terrace_house', 'bungalow', 'studio'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${Array.isArray(answers.property_type) && answers.property_type.includes(option) ? 'btn-active' : ''}`}>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={Array.isArray(answers.property_type) && answers.property_type.includes(option)}
                    onChange={(e) => {
                      const currentTypes = Array.isArray(answers.property_type) ? answers.property_type : [];
                      if (e.target.checked) {
                        setAnswers(a => ({ ...a, property_type: [...currentTypes, option] }));
                      } else {
                        setAnswers(a => ({ ...a, property_type: currentTypes.filter(t => t !== option) }));
                      }
                    }}
                  />
                  {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </label>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      label: 'Room Requirements',
      subQuestions: [
        {
          label: 'Minimum number of bedrooms?',
          content: (
            <input
              className="input input-bordered w-full"
              placeholder="Enter minimum bedrooms"
              type="number"
              value={answers.bedrooms_min}
              onChange={e => setAnswers(a => ({ ...a, bedrooms_min: e.target.value }))}
            />
          ),
        },
        {
          label: 'Minimum number of bathrooms?',
          content: (
            <input
              className="input input-bordered w-full"
              placeholder="Enter minimum bathrooms"
              type="number"
              value={answers.bathrooms_min}
              onChange={e => setAnswers(a => ({ ...a, bathrooms_min: e.target.value }))}
            />
          ),
        },
      ],
    },
    {
      label: 'Size & Parking',
      subQuestions: [
        {
          label: 'Preferred floor area (sqft)?',
          content: (
            <div className="grid grid-cols-2 gap-4">
              <input
                className="input input-bordered w-full"
                placeholder="Min sqft"
                type="number"
                value={answers.floor_area.min}
                onChange={e => setAnswers(a => ({ ...a, floor_area: { ...a.floor_area, min: e.target.value } }))}
              />
              <input
                className="input input-bordered w-full"
                placeholder="Max sqft"
                type="number"
                value={answers.floor_area.max}
                onChange={e => setAnswers(a => ({ ...a, floor_area: { ...a.floor_area, max: e.target.value } }))}
              />
            </div>
          ),
        },
        {
          label: 'How many parking spaces do you need?',
          content: (
            <input
              className="input input-bordered w-full"
              placeholder="Number of parking spaces"
              type="number"
              value={answers.parking_spaces_min}
              onChange={e => setAnswers(a => ({ ...a, parking_spaces_min: e.target.value }))}
            />
          ),
        },
      ],
    },
    {
      label: 'Amenities',
      subQuestions: [
        {
          label: 'Which amenities are important to you?',
          content: (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['gym', 'pool', '24h_security', 'playground', 'pet_friendly', 'concierge'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${Array.isArray(answers.amenities_required) && answers.amenities_required.includes(option) ? 'btn-active' : ''}`}>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={Array.isArray(answers.amenities_required) && answers.amenities_required.includes(option)}
                    onChange={(e) => {
                      const currentAmenities = Array.isArray(answers.amenities_required) ? answers.amenities_required : [];
                      if (e.target.checked) {
                        setAnswers(a => ({ ...a, amenities_required: [...currentAmenities, option] }));
                      } else {
                        setAnswers(a => ({ ...a, amenities_required: currentAmenities.filter(t => t !== option) }));
                      }
                    }}
                  />
                  {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()).replace('24h', '24H')}
                </label>
              ))}
            </div>
          ),
        },
      ],
    },
    {
      label: 'Property Preferences',
      subQuestions: [
        {
          label: 'Do you prefer high-rise or landed property?',
          content: (
            <div className="grid grid-cols-2 gap-4">
              {['high_rise', 'landed'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${answers.building_preference === option ? 'btn-active' : ''}`}>
                  <input
                    type="radio"
                    name="building_preference"
                    className="hidden"
                    value={option}
                    checked={answers.building_preference === option}
                    onChange={() => setAnswers(a => ({ ...a, building_preference: option }))}
                  />
                  {option.replace('_', '-').replace(/\b\w/g, l => l.toUpperCase())}
                </label>
              ))}
            </div>
          ),
        },
        {
          label: 'Is proximity to public transport important?',
          content: (
            <div className="grid grid-cols-2 gap-4">
              {['Yes', 'No'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${answers.near_public_transport === option ? 'btn-active' : ''}`}>
                  <input
                    type="radio"
                    name="near_public_transport"
                    className="hidden"
                    value={option}
                    checked={answers.near_public_transport === option}
                    onChange={() => setAnswers(a => ({ ...a, near_public_transport: option }))}
                  />
                  {option}
                </label>
              ))}
            </div>
          ),
        },
        {
          label: 'Do you prefer a quiet neighborhood or lively city area?',
          content: (
            <div className="grid grid-cols-2 gap-4">
              {['quiet', 'lively'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${answers.environment_preference === option ? 'btn-active' : ''}`}>
                  <input
                    type="radio"
                    name="environment_preference"
                    className="hidden"
                    value={option}
                    checked={answers.environment_preference === option}
                    onChange={() => setAnswers(a => ({ ...a, environment_preference: option }))}
                  />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              ))}
            </div>
          ),
        },
        {
          label: 'Do you need to be near schools?',
          content: (
            <div className="grid grid-cols-2 gap-4">
              {['Yes', 'No'].map(option => (
                <label key={option} className={`btn btn-outline h-16 sm:h-20 w-full flex items-center justify-center cursor-pointer ${answers.near_schools === option ? 'btn-active' : ''}`}>
                  <input
                    type="radio"
                    name="near_schools"
                    className="hidden"
                    value={option}
                    checked={answers.near_schools === option}
                    onChange={() => setAnswers(a => ({ ...a, near_schools: option }))}
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
  const [filteredListings, setFilteredListings] = useState<Property[]>([]);

  // Validation function to check if all required fields are filled
  const isFormValid = () => {
    return (
      answers.household_type !== '' &&
      answers.budget.min !== '' &&
      answers.budget.max !== '' &&
      answers.preferred_locations.length > 0 &&
      answers.property_type.length > 0 &&
      answers.bedrooms_min !== '' &&
      answers.bathrooms_min !== '' &&
      answers.floor_area.min !== '' &&
      answers.floor_area.max !== '' &&
      answers.parking_spaces_min !== '' &&
      answers.building_preference !== '' &&
      answers.near_public_transport !== '' &&
      answers.environment_preference !== '' &&
      answers.near_schools !== ''
    );
  };

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

  async function handleFinish() {
    // Transform the data to match the backend expected format
    const finalData = {
      household_type: answers.household_type,
      budget: {
        min: parseInt(answers.budget.min),
        max: parseInt(answers.budget.max)
      },
      preferred_locations: answers.preferred_locations,
      property_type: answers.property_type,
      bedrooms_min: parseInt(answers.bedrooms_min),
      bathrooms_min: parseInt(answers.bathrooms_min),
      floor_area: {
        min: parseInt(answers.floor_area.min),
        max: parseInt(answers.floor_area.max)
      },
      parking_spaces_min: parseInt(answers.parking_spaces_min),
      amenities_required: answers.amenities_required,
      building_preference: answers.building_preference,
      near_public_transport: answers.near_public_transport === 'Yes',
      environment_preference: answers.environment_preference,
      near_schools: answers.near_schools === 'Yes'
    };

    console.log('Questionnaire Data:', JSON.stringify(finalData, null, 2));

    try {
      // Send data to the API and filter results
      const response = await axios.post('http://localhost:5000/api/filter-properties', {
        budget: finalData.budget,
        preferred_locations: finalData.preferred_locations
      });

      if (response.data.success) {
        // Set the first 10 results to the state
        setFilteredListings(response.data.properties.slice(0, 10));
      } else {
        console.error('API returned an error:', response.data.error);
      }
    } catch (error) {
      console.error('Error calling the API:', error);
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
              <button 
                className={`btn w-full sm:w-auto ${isFormValid() ? 'btn-primary' : 'btn-disabled'}`} 
                disabled={!isFormValid()}
                onClick={handleFinish}
              >
                Finish
              </button>
            ) : (
              <button className="btn btn-base-300 w-full sm:w-auto" onClick={handleNext}>Next</button>
            )}
          </div>
        </div>
      </div>
      {/* Display filtered listings using SwipeCards */}
      {filteredListings.length > 0 && (
        <div className="w-full p-4">
          <h2 className="text-xl font-bold mb-4">Recommended Properties</h2>
          <SwipeCards
            listings={filteredListings.map((property) => ({
              id: parseInt(property.id, 10), // Convert id to number
              title: property.title,
              image: property.cover.url,
              price: property.prices[0]?.min ? `RM ${property.prices[0].min}` : 'Price not available',
              location: property.address.formattedAddress,
              coords: [property.address.lat, property.address.lng]
            }))}
            onCardClick={(newLocation) => console.log('Navigate to:', newLocation)}
          />
        </div>
      )}
    </div>
  )
}

export default Questionnaire
