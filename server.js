const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// Serve static files (frontend HTML, CSS, JS)
app.use(express.static("public"));

// Define an endpoint to handle Wikipedia requests
app.get("/search", async (req, res) => {
  const year = req.query.year;
  if (!year) {
    return res.status(400).json({ error: "Year is required!" });
  }

  const wikiApiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=events+of+${year}&format=json`;

  try {
    const response = await fetch(wikiApiUrl);
    const data = await response.json();
    res.json(data); // Send the API response to the client
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
