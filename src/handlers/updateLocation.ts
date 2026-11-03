import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import{updateLocation} from '../services/locationRepo';
import {fetchLocation, type Location} from '../services/nominatim';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try{

        // Extract the locationId from the query string parameters and the location details from the request body.
        const locationId = event.pathParameters?.locationId;

        // Parse the request body to extract the location details.
        const {locationName,city,state,country} = JSON.parse(event.body || '{}');

        // Validate that all required fields are present.
        if (!locationId || !locationName || !city || !state || !country) {
            return {
                statusCode: 400,
                body: JSON.stringify({status: 400, error: 'Missing required fields'}),
            };
        }

        // Fetch the latitude and longitude for the location using the Nominatim API.
        const {latitude, longitude} = await fetchLocation(city, state, country);

        //Build the location object with the extracted and fetched data.
        const location : Location = {
            locationId,
            locationName,
            city,
            state,
            country,
            latitude,
            longitude
        };

        // Update the location in the repository with the new data.
        await updateLocation(location);

        // Return the updated location as the response.
        return {
            statusCode: 200,
            body: JSON.stringify({status: 200, location}),
        };

        // Handle any errors that occur during the process.
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({status: 500, error: 'Internal server error'}),
        };
    }
}