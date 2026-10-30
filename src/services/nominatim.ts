
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

//fetchLocation function fetches the latitude and longitude of a location based on the provided city, state, and country. It returns an object containing the latitude and longitude as numbers.

export async function fetchLocation(city: string, state: string, country: string): Promise<{latitude: number, longitude: number}> {
    const response = await fetch(buildSearchUrl(city, state, country), {
        //User-Agent header to identify the application making the request. Nominatim's usage policy requires a valid User-Agent string.
        headers: {'User-Agent': 'location-api/1.0'},
        signal: AbortSignal.timeout(5000), // Set a timeout of 5 seconds
});

if (!response.ok) {
    throw new Error(`Failed to fetch location data: ${response.statusText}`);}

const result = (await response.json()) as {lat: string, lon: string}[];
    if (result.length === 0) {
        throw new Error('No location data found');
    }

    //nominatim API returns latitude and longitude as strings, so we need to convert them into numbers before returning.
    return {
        latitude: parseFloat(result[0].lat),
        longitude: parseFloat(result[0].lon)
    };
}