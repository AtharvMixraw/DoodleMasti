const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const { connectDB, sequelize } = require("./config/db");

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
}));
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

// Database Connection
connectDB();
sequelize.sync({ force: false })
  .then(() => console.log("Database synced."))
  .catch((err) => console.error("Error syncing database:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));