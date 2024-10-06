const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { url } = JSON.parse(event.body);
    console.log('Scraping URL:', url);

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    console.log('Received response from Airbnb');

    const $ = cheerio.load(response.data);
    console.log('Cheerio loaded HTML');

    const title = $('h1[data-section-id="TITLE_DEFAULT"]').first().text().trim();
    console.log('Extracted title:', title);

    const description = $('div[data-section-id="DESCRIPTION_DEFAULT"]').text().trim();
    console.log('Extracted description:', description);

    const imageUrl = $('img[data-testid="photo-viewer-slideshow-img"]').first().attr('src');
    console.log('Extracted image URL:', imageUrl);

    const location = $('h1[data-section-id="LOCATION_DEFAULT"]').text().trim();
    console.log('Extracted location:', location);

    const scrapedData = { title, description, imageUrl, location };
    console.log('Scraped data:', scrapedData);

    return {
      statusCode: 200,
      body: JSON.stringify(scrapedData),
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to scrape the listing', details: error.message, stack: error.stack }),
    };
  }
};