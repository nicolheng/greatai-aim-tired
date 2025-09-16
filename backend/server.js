import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//test mongodb
import testRoutes from "./routes/testRoutes.js";
app.use("/api/test", testRoutes);

//testing purpose :D
app.get("/", (req, res) => {
    res.json("test")
});

// Mount routes
// app.use("/api/users", userRoutes);
// app.use("/api/properties", propertyRoutes);

// Error handler (custom middleware)
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));