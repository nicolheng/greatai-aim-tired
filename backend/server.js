import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import questionairesRoutes from "./routes/questionaire.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/questionaire", questionairesRoutes);

//testing purpose :D
app.get("/", (req, res) => {
    res.json("test");
});

// Error handler (custom middleware)
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));