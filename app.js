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
var districts = []
for (let index = 0; index < states.length; index++) {
    const state = states[index];
    axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + state['state_id'])
        .then(res => {
            // console.log(res.data['districts'])
            districts.push(...res.data['districts'])
            // console.log(districts)
            if (index === states.length - 1) {
                setTimeout(() => {
                    console.log(districts.length)
                    fs.writeFile('districts.json', JSON.stringify(districts), err => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        //file written successfully
                    })
                }, 2000);
            }
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
}
// states.forEach((state) => {
//     axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + state['state_id'])
//         .then(res => {
//             // console.log(res.data['districts'])
//             districts.push(...res.data['districts'])
//             // if(districts.length) {
//             //     districts.concat(res.data['districts'])
//             // } else {
//             //     districts = res.data['districts']
//             // }
//             console.log(districts)
//         })
//         .catch(err => {
//             console.log('Error: ', err.message);
//         });
// })

// axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/32')
//   .then(res => {
//     console.log(res.data['districts'])
//   })
//   .catch(err => {
//     console.log('Error: ', err.message);
//   });

//   axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=581&date=04-05-2021')
//   .then(res => {
//     console.log(JSON.stringify(res.data))
//   })
//   .catch(err => {
//     console.log('Error: ', err.message);
//   });



app.get("/getData", (req, res) => {
    res.send("Hi you are not alone !!!");
})


app.listen(3061, () => {
    console.log("listening on port 3061")
})