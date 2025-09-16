import express from "express";
import Test from "../models/test.js";

const router = express.Router();

// Write to DB
router.post("/", async (req, res) => {
  const doc = await Test.create({ name: "Hello MongoDB" });
  res.json(doc);
});

// Read from DB
router.get("/", async (req, res) => {
  const docs = await Test.find();
  res.json(docs);
});

export default router;
