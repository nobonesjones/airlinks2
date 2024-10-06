import axios from 'axios';

export async function scrapeAirbnbListing(url: string): Promise<{ title: string; description: string; imageUrl: string; location: string }> {
  try {
    const response = await axios.post('/.netlify/functions/scrapeAirbnb', { url });
    return response.data;
  } catch (error) {
    console.error('Error scraping listing:', error);
    throw new Error('Failed to scrape the listing');
  }
}