import express from "express";
import { getProperties } from "../services/propertyService.js";

const router = express.Router();

// Base route - shows available endpoints
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Property Service API",
    availableEndpoints: {
      "GET /api/properties": "This endpoint (shows available routes)",
      "GET /api/properties/test": "Test with sample property IDs",
      "GET /api/properties/test/property-1,property-2": "Test with specific property IDs (comma separated)",
      "GET /api/properties/sale-4377301": "Get specific property by ID"
    },
    usage: {
      sampleCall: "GET /api/properties/test",
      customIds: "GET /api/properties/test/your-id-1,your-id-2,your-id-3",
      singleProperty: "GET /api/properties/your-property-id"
    }
  });
});

// Direct property access route (for single property IDs)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Skip routes that are handled elsewhere
    if (id === 'test') {
      return res.status(404).json({
        success: false,
        error: "Use /api/properties/test for testing"
      });
    }
    
    console.log('Getting property with ID:', id);
    const properties = await getProperties([id]);
    
    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        error: `Property with ID '${id}' not found`,
        searchedId: id
      });
    }
    
    res.json({
      success: true,
      property: properties[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      errorType: error.name,
      searchedId: req.params.id
    });
  }
});

// Test route to get properties
router.get("/test/:ids", async (req, res) => {
  try {
    const { ids } = req.params;
    const propertyIds = ids.split(',');
    
    console.log('Testing with IDs:', propertyIds);
    const properties = await getProperties(propertyIds);
    
    res.json({
      success: true,
      requestedIds: propertyIds,
      foundProperties: properties.length,
      properties: properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      errorType: error.name
    });
  }
});

// Test route with sample data
router.get("/test", async (req, res) => {
  try {
    const sampleIds = ['property-1', 'property-2', 'property-3'];
    const properties = await getProperties(sampleIds);
    
    res.json({
      success: true,
      message: "Testing with sample property IDs",
      sampleIds: sampleIds,
      foundProperties: properties.length,
      properties: properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      errorType: error.name
    });
  }
});

export default router;