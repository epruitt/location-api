import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getAllLocations } from "../services/locationRepo";

// This handler retrieves all location data from the DynamoDB table and returns it as a JSON response.
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const locations = await getAllLocations();
        return {
            statusCode: 200,
            body: JSON.stringify(locations),
        };
    } catch (error) {
        console.error("Error fetching locations:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};