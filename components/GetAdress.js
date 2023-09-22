import axios from 'axios';

const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

const getAddressSuggestions = async (query) => {
    try {
        const response = await axios.get(NOMINATIM_API_URL, {
            params: {
                q: query,
                format: 'json',
                limit: 3,
                countrycodes: 'FR'
            },
        });

        if (response.data && response.data.length > 0) {
            return response.data.map((result) => ({
                displayName: result.display_name,
                lat: parseFloat(result.lat),
                lon: parseFloat(result.lon),
            }));
        }

        return [];
    } catch (error) {
        console.error('Error fetch des suggestio,ns:', error);
        return [];
    }
};

export default getAddressSuggestions;