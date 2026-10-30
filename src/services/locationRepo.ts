import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Location } from "./nominatim";

const client =  DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME!;


// saves new location data to the DynamoDB table. 
export async function createLocation(location: Location): Promise<void> {
    await client.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: location
    }));
}

// retrieves location data from the DynamoDB table.
export async  function getAllLocations(): Promise<Location[]> {
    const result = await client.send(new ScanCommand({
        TableName: TABLE_NAME
    }));
    return result.Items as Location[];
}

// retrieves location data by locationId from the DynamoDB table.
export async function getLocationById(locationId: string): Promise<Location | undefined> {
    const result = await client.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: { locationId }
    }));

    return result.Item as Location | undefined;
}

// updates existing location data in the DynamoDB table.
export async function updateLocation(location: Location): Promise<void> {
    await client.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: location,
        ConditionExpression: "attribute_exists(locationId)" // ensures that the item exists before updating
    }));
}