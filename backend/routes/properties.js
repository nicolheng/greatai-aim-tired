import express from "express";
import { getProperties, getProperty} from "../controllers/propertyControllers.js"

router = express.Router();

router.get("/properties", getProperties);
router.get("/properties/:id", getProperty); //do we need this tho, i feel like

export default router;