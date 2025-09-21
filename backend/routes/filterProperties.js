import express from "express";
import { getAllProperties } from "../services/propertyService.js";

const router = express.Router();

// POST /api/filter-properties
// Body: { budget: { min: number, max: number }, preferred_locations: string[] }
router.post("/", async (req, res) => {
  try {
    const { budget, preferred_locations } = req.body;

    // Validate input
    if (!budget || typeof budget.min !== 'number' || typeof budget.max !== 'number' || budget.min > budget.max) {
      return res.status(400).json({ success: false, error: "Invalid budget parameters" });
    }
    if (!Array.isArray(preferred_locations)) {
      return res.status(400).json({ success: false, error: "Preferred locations must be an array" });
    }

    console.log(`Filtering properties with budget: ${budget.min}-${budget.max}, locations: ${preferred_locations.join(', ')}`);

    // Fetch all properties from the database
    const allProperties = await getAllProperties();
    console.log(`Fetched ${allProperties.length} properties from database`);

    // Filter by budget and location
    const filtered = allProperties.filter((prop) => {
      // Budget filter: check if property price is within min and max
      const price = prop.prices && prop.prices[0] && typeof prop.prices[0].min === 'number' ? prop.prices[0].min : 0;
      const inBudget = price >= budget.min && price <= budget.max;

      // Location filter: check if any preferred location is in the address
      const inLocation = preferred_locations.length === 0 || preferred_locations.some(loc =>
        prop.address && prop.address.formattedAddress &&
        prop.address.formattedAddress.toLowerCase().includes(loc.toLowerCase().trim())
      );

      return inBudget && inLocation;
    });

    console.log(`Filtered to ${filtered.length} properties`);

    // Return the first 10 filtered properties
    const top10Properties = filtered.slice(0, 10);

    res.json({
      success: true,
      properties: top10Properties,
      totalFiltered: filtered.length
    });
  } catch (error) {
    console.error("Error filtering properties:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

export default router;
