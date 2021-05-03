const express = require('express');
const app = express();
const schedule = require('node-schedule');
const axios = require('axios');
const fs = require('fs')


// axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
//     .then(res => {
//         console.log(res.data.states)
//         fs.writeFile('states.json', JSON.stringify(res.data.states), err => {
//             if (err) {
//                 console.error(err)
//                 return
//             }
//             //file written successfully
//         })
//     })
//     .catch(err => {
//         console.log('Error: ', err.message);
//     });

const states = require('./states.json')
console.log(states)
var districts_fetched = []
var centers = []
    const state = states[32];
    axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + state['state_id'])
        .then(res => {
            districts_fetched = res.data['districts'];
                setTimeout(() => {
                    console.log(districts_fetched.length)
                    for (let index = 0; index < districts_fetched.length; index++) {
                        const district = districts_fetched[index];
                        setTimeout(() => {
                            axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=' + district['district_id'] + '&date=04-05-2021')
                                .then(res => {
                                    // console.log(res.data['centers'])
                                    centers.push(...res.data['centers'])
                                    console.log(centers)
                                    if (index === districts_fetched.length - 1) {
                                        setTimeout(() => {
                                            console.log(centers.length)
                                            fs.writeFile('centers.json', JSON.stringify(centers), err => {
                                                if (err) {
                                                    console.error(err)
                                                    return
                                                }
                                                //file written successfully
                                            })
                                        }, 3000);
                                    }
                                })
                                .catch(err => {
                                    console.log('Error: ', err.message);
                                });
                        }, 20);
                    }
                }, 2000);
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });


app.get("/getData", (req, res) => {
    res.send("Hi you are not alone !!!");
})


app.listen(3061, () => {
    console.log("listening on port 3061")
})