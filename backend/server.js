import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import questionairesRoutes from "./routes/questionaire.js";
import testPropertiesRoutes from "./routes/testProperties.js";

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow frontend origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/api/questionaire", questionairesRoutes);
app.use("/api/properties", testPropertiesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} with CORS enabled`));