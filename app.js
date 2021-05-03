const express = require('express');
const app = express();
const schedule = require('node-schedule');
const axios = require('axios');
const fs = require('fs')

app.get("/getStates", async (req, res) => {
    try {
        const statesResponse = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
        res.send(statesResponse.data.states)
    } catch (error) {
        console.error(error);
    }
})

var districts_fetched = []

app.get("/getLocationData/:state_id", async (req, res) => {
    try {
        const districtsResponse = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + req.params.state_id);
        console.log(districtsResponse);
        districts_fetched = districtsResponse.data['districts'];
        var centers = []
        console.log(districts_fetched.length)
        for (let index = 0; index < districts_fetched.length; index++) {
            const district = districts_fetched[index];
            setTimeout(async () => {
                const centersResponse = await axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=' + district['district_id'] + '&date=04-05-2021')
                centers.push(...centersResponse.data['centers'])
                if (index === districts_fetched.length - 1) {
                    setTimeout(() => {
                        console.log(centers.length)
                        res.send(centers)
                    }, 500);
                }
            }, 50);
        }
    } catch (error) {
        console.error(error);
    }

})


app.listen(3061, () => {
    console.log("listening on port 3061")
})