const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 8000;

app.use(cors()); // Enable CORS
app.use(express.json());

const WHOIS_API_KEY = "at_dPQ5tTOsJOHpjKAntEFvGxdo1JFD1";

// Function to extract only the hostname
const extractHostname = (url) => {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return null;
  }
};

// API route to fetch WHOIS details
app.get("/api/whois", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  const hostname = extractHostname(url);
  if (!hostname) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  try {
    const apiUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${WHOIS_API_KEY}&domainName=${hostname}&outputFormat=json`;
    const response = await axios.get(apiUrl);

    res.json(response.data); // Send WHOIS data back to frontend
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch WHOIS details" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
