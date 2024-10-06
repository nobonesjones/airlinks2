const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { url } = JSON.parse(event.body);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('h1[data-section-id="TITLE_DEFAULT"]').first().text().trim();
    const description = $('div[data-section-id="DESCRIPTION_DEFAULT"]').text().trim();
    const imageUrl = $('img[data-testid="photo-viewer-slideshow-img"]').first().attr('src');
    const location = $('h1[data-section-id="LOCATION_DEFAULT"]').text().trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ title, description, imageUrl, location }),
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to scrape the listing', details: error.message }),
    };
  }
};