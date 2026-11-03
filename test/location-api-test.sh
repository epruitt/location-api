api_url="https://orjp1h6c99.execute-api.us-east-2.amazonaws.com/prod/locations"

echo "=========================================="
echo " STARTING API TESTING"
echo "=========================================="


#create a location
curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Dallas Branch",
    "city": "Dallas",
    "state": "Texas",
    "country": "USA"
}'

CREATE_RESPONSE=$(curl -s -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Dallas Branch",
    "city": "Dallas",
    "state": "Texas",
    "country": "USA"
}')

## retrieving location ID after creation
locationId=$(echo "$CREATE_RESPONSE" | grep -o '"locationId":[^,]*' | cut -d':' -f2 | tr -d '" ')
echo "Found ID: $locationId"

echo -e " "
echo "==========="
echo "Creating Multiple locations"
echo "==========="
echo -e " "

#Creating multiple locations

curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Las Vegas Branch",
    "city": "Las Vegas",
    "state": "Nevada",
    "country": "USA"
}'

curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Boston Branch",
    "city": "Boston",
    "state": "Massachusetts",
    "country": "USA"
}'

curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Miami Branch",
    "city": "Miami",
    "state": "Florida",
    "country": "USA"
}'

curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Denver Branch",
    "city": "Denver",
    "state": "Colorado",
    "country": "USA"
}'

curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Seattle Branch",
    "city": "Seattle",
    "state": "Washington",
    "country": "USA"
}'

curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Durham Branch",
    "city": "Durham",
    "state": "England",
    "country": "UK"
}'

echo -e ""
echo "==========="
echo "Retrieving All Locations"
echo "==========="
echo -e ""
# Get all locations
curl -X GET $api_url

echo -e ""
echo "==========="
echo "Retrieving a Location by ID"
echo "==========="
echo -e ""
# Get a location by ID
curl -X GET $api_url/$locationId

echo -e " "
echo "==========="
echo "Updating a Location by ID"
echo "==========="
echo -e " "
# Update a location
curl -X PUT $api_url/$locationId -H "Content-Type: application/json" -d '{
    "locationName": "Austin Branch",
    "city": "Austin",
    "state": "Texas",
    "country": "USA"
}'

echo -e " "
echo "==========="
echo "Testing Error Cases"
echo "==========="
echo -e " "
# Error cases:

echo -e " "
echo "==========="
echo "Testing Bad City (expect 422)"
echo "==========="
echo -e " "
# Create a location - bad city (expect 422)
curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Fake Branch",
    "city": "Notarealcity",
    "state": "Nowhere",
    "country": "USA"
}'

echo -e " "
echo "==========="
echo "Testing Missing Fields (expect 400)"
echo "==========="
echo -e " "
# Create a location - missing fields (expect 400)
curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Incomplete Branch"
}'

echo -e " "
echo "==========="
echo "Testing Unknown ID (expect 404)"
echo "==========="
echo -e " "
# Get a location - unknown ID (expect 404)
curl -X GET $api_url/does-not-exist

echo -e " "
echo "==========="
echo "Testing Unknown ID for Update (expect 500)"
echo "==========="
echo -e " "

# Update a location - unknown ID (expect 500)
curl -X PUT $api_url/does-not-exist -H "Content-Type: application/json" -d '{
    "locationName": "Ghost Branch",
    "city": "Austin",
    "state": "Texas",
    "country": "USA"
}'