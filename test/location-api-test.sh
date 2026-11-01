api_url= COPY_API_URL_HERE
locationId= COPY_LOCATION_ID_HERE


# Create locations
curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Dallas Branch",
    "city": "Dallas",
    "state": "Texas",
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

# Get all locations
curl -X GET $api_url

# Get a location by ID
curl -X GET $api_url/$locationId

# Update a location
curl -X PUT $api_url/$locationId -H "Content-Type: application/json" -d '{
    "locationName": "Austin Branch",
    "city": "Austin",
    "state": "Texas",
    "country": "USA"
}'

# Error cases:

# Create a location - bad city (expect 422)
curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Fake Branch",
    "city": "Notarealcity",
    "state": "Nowhere",
    "country": "USA"
}'

# Create a location - missing fields (expect 400)
curl -X POST $api_url -H "Content-Type: application/json" -d '{
    "locationName": "Incomplete Branch"
}'

# Get a location - unknown ID (expect 404)
curl -X GET $api_url/does-not-exist

# Update a location - unknown ID (expect 404)
curl -X PUT $api_url/does-not-exist -H "Content-Type: application/json" -d '{
    "locationName": "Ghost Branch",
    "city": "Austin",
    "state": "Texas",
    "country": "USA"
}'