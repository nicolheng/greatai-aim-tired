import express from "express";
import { submitQuestionaire } from "../controllers/questionaireControllers.js"

const router = express.Router();

router.post("/", submitQuestionaire);

export default router;