const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');

//dotenv configuration
dotenv.config();

// Create Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './client/build')));

// API routes should be before the wildcard route
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

// Fallback to index.html for all non-API routes (React app routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
    
});

// Set port and start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
