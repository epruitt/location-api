import {randomUUID} from "crypto";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {createLocation} from "../services/locationRepo";
import {fetchLocation} from "../services/nominatim";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try{
        let body;
        // Parse the request body and handle any potential errors during parsing
        try {
            body = JSON.parse(event.body || '');
        } catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Invalid JSON in request body" }),
            };
        }

        const {locationName, city, state, country, latitude, longitude} = body;

        // Validate required fields in the request body
        if (!locationName || !city || !state || !country || latitude === undefined || longitude === undefined) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Missing required fields" }),
            };
        }

        let coordinates;

        try {
            // Fetch the coordinates using the Nominatim service
            coordinates = await fetchLocation(city, state, country);
        } catch (error) {
            console.error("Error fetching location data:", error);

            // If fetching location data fails, return a 422 response with an error message
            return {
                statusCode: 422,
                body: JSON.stringify({ message: "could not find coordinates for the specified location" }),
            };
        }

        // Build the location object
        const location = {
            locationId: randomUUID(),
            locationName,
            city,
            state,
            country,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        };

        // Create the location in the repository (e.g., DynamoDB)
        await createLocation(location);

        // Return a 201 response with the created location data
        return {
            statusCode: 201,
            body: JSON.stringify(location),
        };
        // Handle any unexpected errors and return a 500 response
    } catch (error) {
        console.error("Error creating location:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};