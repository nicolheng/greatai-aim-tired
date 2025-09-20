import express from "express";
import { getUser, setUser, getPreference, setPreference } from "../controllers/userControllers.js"

const router = express.Router();

router.get("/me", getUser);
router.put("/me", setUser);
router.post("/me/preferences", setPreference);
router.get("/me/preferences", getPreference);

export default router;