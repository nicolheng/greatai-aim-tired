/**
 * Build prompt for LLM using user answers and top retrieved properties
 */
export function buildPrompt(userAnswers, retrievedProperties) {
    const yesNo = (val) => (val ? "yes" : "no");

    const bullets = [
        `- Household: ${userAnswers.household_type}`,
        `- Budget: ${userAnswers.budget.min} - ${userAnswers.budget.max}`,
        `- Location: ${userAnswers.preferred_locations.join(", ")}`,
        `- Property type: ${userAnswers.property_type.join(", ")}`,
        `- Bedrooms: min ${userAnswers.bedrooms_min}`,
        `- Bathrooms: min ${userAnswers.bathrooms_min}`,
        `- Floor area: ${userAnswers.floor_area.min}–${userAnswers.floor_area.max} sqft`,
        `- Parking: min ${userAnswers.parking_spaces_min}`,
        `- Amenities: ${userAnswers.amenities_required.join(", ")}`,
        `- Building: ${userAnswers.building_preference}`,
        `- Near public transport: ${yesNo(userAnswers.near_public_transport)}`,
        `- Neighborhood: ${userAnswers.environment_preference}`,
        `- Near schools: ${yesNo(userAnswers.near_schools)}`
    ];

    const propertiesText = retrievedProperties
        .map((prop, idx) =>
            `Property ${idx + 1}:\n` +
            `- ID: ${prop.id}\n` +
            `- Title: ${prop.title || ""}\n` +
            `- Description: ${prop.description || ""}\n` +
            `- Price: ${prop.price || ""}`
        )
        .join("\n\n");

    return `
You are a real estate assistant.
The user has provided their requirements. Based on these, explain why each of the following properties is a good match.

User requirements:
${bullets.join("\n")}

Retrieved properties:
${propertiesText}

Guidelines for insights:
- Link each explanation directly to the user’s requirements (budget, location, household type, amenities, etc.).
- Keep each insight short and clear (1–2 sentences).

Return the answer strictly in JSON with this structure:
{
  "results": [
    { "id": "property-id-1", "insight": "..." },
    { "id": "property-id-2", "insight": "..." },
    { "id": "property-id-3", "insight": "..." },
    { "id": "property-id-4", "insight": "..." },
    { "id": "property-id-5", "insight": "..." }
  ]
}
    `.trim();
}
