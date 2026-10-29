
//location interface defines the structure of a location object, which includes properties such as locationId, locationName, city, country, latitude, and longitude.
export interface Location {
    locationId: string;
    locationName: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
}

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';

//builds the search URL for the Nominatim API based on the provided city, state, and country. It returns a string representing the complete URL to be used for the API request.
export function buildSearchUrl(city:string, state:string, country: string): string {
    const params = new URLSearchParams({
        q: `${city}, ${state}, ${country}`,
        format: 'json',
        limit: '1'
    });

    return `${NOMINATIM_BASE_URL}?${params.toString()}`;
}