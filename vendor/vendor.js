'user strict'

require('dotenv').config();
const io = require('socket.io-client')
let host = 'http://localhost:3000';
const caps = io.connect(host)

const faker = require('faker')

caps.on('finalized', payload => {
  setTimeout( () => {
    console.log(`VENDOR: Thank you for delivering ${payload.randomOrderID}.\n`)
    console.log(`TIME: ` + Date.now() + `\nSTORE: ${payload.storeName}\nNAME: ${payload.randomName}\nADDRESS:${payload.randomAddress}\nORDER_ID: ${payload.randomOrderID}\n`);
  }, 1000)
})

// events.on('finalized', thanks);

// function thanks(payload) {
//   setTimeout( () => {
//     console.log(`VENDOR: Thank you for delivering ${payload.randomOrderID}.\n`)
//     console.log(`TIME: ` + Date.now() + `\nSTORE: ${payload.storeName}\nNAME: ${payload.randomName}\nADDRESS:${payload.randomAddress}\nORDER_ID: ${payload.randomOrderID}\n`);
//   }, 1000)
// }

setInterval( () => {
  const order = {
    storeName: process.env.STORENAME,
    randomName: faker.name.findName(),
    randomAddress: faker.address.cityName(),
    randomOrderID: Math.floor(Math.random() * 100)
  }
  console.log(`TIME: ` + Date.now())
  caps.emit('pickup', order);
}, 5000)

module.exports = { };