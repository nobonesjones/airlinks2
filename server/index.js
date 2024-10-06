const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('h1').first().text().trim();
    const description = $('meta[name="description"]').attr('content');
    const imageUrl = $('meta[property="og:image"]').attr('content');
    const location = $('[data-section-id="LOCATION_DEFAULT"]').text().trim();

    res.json({ title, description, imageUrl, location });
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Failed to scrape the listing' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});