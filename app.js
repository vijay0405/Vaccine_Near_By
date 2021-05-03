const express = require('express');
const app = express();
const schedule = require('node-schedule');
const axios = require('axios');

axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/32')
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });

  axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=581&date=04-05-2021')
  .then(res => {
    console.log(JSON.stringify(res.data))
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });



app.get("/getData", (req, res)=>{
    res.send("Hi you are not alone !!!");
})


app.listen(3061, ()=>{
    console.log("listening on port 3061")
})