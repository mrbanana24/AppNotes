const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

// Middlewares
app.use(express.json());

// Connect to database
const connectDB = require("./config/database");
connectDB();

// Config CORS
app.use(cors());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const noteRoutes = require("./routes/noteRoutes");
app.use("/notes", noteRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
