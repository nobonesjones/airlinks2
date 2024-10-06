const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { url } = req.body;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const title = $('h1').first().text().trim();
      const description = $('meta[name="description"]').attr('content');
      const imageUrl = $('meta[property="og:image"]').attr('content');
      const location = $('[data-section-id="LOCATION_DEFAULT"]').text().trim();

      res.status(200).json({ title, description, imageUrl, location });
    } catch (error) {
      console.error('Scraping error:', error);
      res.status(500).json({ error: 'Failed to scrape the listing' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};