# vaccine_Near_By 
locate near by vaccine centers using cowin public api's

app.js contains api's to fetch centers across entire state for up to 7 days from the give date.

used cowin public endpoints mentioned below:

https://cdn-api.co-vin.in/api/v2/admin/location/states for states and

https://cdn-api.co-vin.in/api/v2/admin/location/districts/state_id for districts

https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=512&date=31-03-2021 for centers

# Deployment instructions
All the cowin api's will only work with IP addresses that are from india. Choose india zone in any cloud provider for deployment.
And also check cowin api rate limits.




 
