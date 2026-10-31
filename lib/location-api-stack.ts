import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as path from 'path';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import {Stack, StackProps, Duration, RemovalPolicy, CfnOutput} from 'aws-cdk-lib/core';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LocationApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the DynamoDB table for storing location data.
    const locationTable = new dynamodb.Table(this, 'LocationTable',{
      partitionKey: { name: 'locationId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    //Lambda functions for handling location API requests.
    const helperFunc = (name: string, file: string) => new NodejsFunction(this, name, {
      entry: path.join(__dirname, `../src/handlers/${file}.ts`),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      environment: {
        LOCATION_TABLE_NAME: locationTable.tableName,
      },
    });

    // Define the Lambda functions for each location API operation.
    const createLocationFunc = helperFunc('CreateLocationFunc', 'createLocation');
    const getLocationByIdFunc = helperFunc('GetLocationFunc', 'getLocationById');
    const updateLocationFunc = helperFunc('UpdateLocationFunc', 'updateLocation');
    const getAllLocationsFunc = helperFunc('GetAllLocationsFunc', 'getAllLocations');

    //Permissions for the Lambda functions to access the DynamoDB table. (least privilege)
    locationTable.grantWriteData(createLocationFunc);
    locationTable.grantReadData(getLocationByIdFunc);
    locationTable.grantWriteData(updateLocationFunc);
    locationTable.grantReadData(getAllLocationsFunc);

    // Define the API Gateway for the location API.
    const api = new apigateway.RestApi(this, 'LocationApi', {
      restApiName: 'Location API',
    });


    // Define the resource paths for the location API.
    const locationPath = api.root.addResource('locations');
    locationPath.addMethod('POST', new apigateway.LambdaIntegration(createLocationFunc));
    locationPath.addMethod('GET', new apigateway.LambdaIntegration(getAllLocationsFunc));

    // Define the resource path for a specific location by ID.
    const locationIdPath = locationPath.addResource('{locationId}');
    locationIdPath.addMethod('GET', new apigateway.LambdaIntegration(getLocationByIdFunc));
    locationIdPath.addMethod('PUT', new apigateway.LambdaIntegration(updateLocationFunc));
  }
}
