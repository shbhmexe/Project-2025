const axios = require('axios');

const UNSPLASH_API = 'https://api.unsplash.com';

const searchImages = async (query, page = 1, perPage = 20) => {
  try {
    const response = await axios.get(`${UNSPLASH_API}/search/photos`, {
      params: {
        query,
        page,
        per_page: perPage
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    return {
      results: response.data.results.map(photo => ({
        id: photo.id,
        url: photo.urls.regular,
        thumb: photo.urls.thumb,
        description: photo.description || photo.alt_description,
        user: {
          name: photo.user.name,
          username: photo.user.username
        },
        likes: photo.likes
      })),
      total: response.data.total,
      totalPages: response.data.total_pages
    };
  } catch (error) {
    console.error('Unsplash API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch images from Unsplash');
  }
};

module.exports = { searchImages };
