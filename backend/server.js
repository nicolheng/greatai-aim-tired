import express from "express";
import dotenv from "dotenv";
import questionairesRoutes from "./routes/questionaire.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/questionaire", questionairesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));