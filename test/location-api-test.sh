api_url= COPY_API_URL_HERE
locationId= COPY_LOCATION_ID_HERE

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

echo "==========="
echo "Creating Multiple locations"
echo "==========="

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

echo "==========="
echo "Retrieving All Locations"
echo "==========="
# Get all locations
curl -X GET $api_url

echo "==========="
echo "Retrieving a Location by ID"
echo "==========="
# Get a location by ID
curl -X GET $api_url/$locationId

echo "==========="
echo "Updating a Location by ID"
echo "==========="
# Update a location
curl -X PUT $api_url/$locationId -H "Content-Type: application/json" -d '{
    "locationName": "Austin Branch",
    "city": "Austin",
    "state": "Texas",
    "country": "USA"
}'

echo "==========="
echo "Testing Error Cases"
echo "==========="
# Error cases:

echo "==========="
echo "Testing Bad City (expect 422)"
echo "==========="
# Create a location - bad city (expect 422)
curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Fake Branch",
    "city": "Notarealcity",
    "state": "Nowhere",
    "country": "USA"
}'

echo "==========="
echo "Testing Missing Fields (expect 400)"
echo "==========="
# Create a location - missing fields (expect 400)
curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Incomplete Branch"
}'

echo "==========="
echo "Testing Unknown ID (expect 404)"
echo "==========="
# Get a location - unknown ID (expect 404)
curl -X GET $api_url/does-not-exist

echo "==========="
echo "Testing Unknown ID for Update (expect 404)"
echo "==========="
# Update a location - unknown ID (expect 404)
curl -X PUT $api_url/does-not-exist -H "Content-Type: application/json" -d '{
    "locationName": "Ghost Branch",
    "city": "Austin",
    "state": "Texas",
    "country": "USA"
}'