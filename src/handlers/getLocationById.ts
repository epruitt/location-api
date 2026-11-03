import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getLocationById} from "../services/locationRepo";
import { STATUS_CODES } from "http";

// This handler retrieves a specific location by its ID from the DynamoDB table and returns it as a JSON response.
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const locationId = event.pathParameters?.locationId; // Assuming the location ID is passed as a path parameter

        // Validate the location ID
        if (!locationId) {
            return {
                statusCode: 400,
                body: JSON.stringify({status: 400, message: "Location ID is required" }),
            };
        }

        const location = await getLocationById(locationId); // Fetch the location by ID from the database (e.g., DynamoDB)

        // If the location is not found, return a 404 response
        if (!location) {
            return {
                statusCode: 404,
                body: JSON.stringify({status: 404, message: "Location not found" }),
            };
        }

        // Return the location data as a JSON response
        return {
            statusCode: 200,
            body: JSON.stringify({status: 200, location}),
        };

       // Handle any unexpected errors and return a 500 response 
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching location by ID:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 500, message: "Internal Server Error" }),
        };
    }
}