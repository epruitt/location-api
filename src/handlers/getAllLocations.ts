import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getAllLocations } from "../services/locationRepo";

// This handler retrieves all location data from the DynamoDB table and returns it as a JSON response.
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const locations = await getAllLocations(); // Fetch all locations from the repository

        // Return the list of locations as a JSON response
        return {
            statusCode: 200,
            body: JSON.stringify({status: 200, locations}),
        };

      // Handle any unexpected errors and return a 500 response  
    } catch (error) {
        console.error("Error fetching locations:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({status: 500, message: "Internal Server Error" }),
        };
    }
};