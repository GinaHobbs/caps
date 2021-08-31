'user strict'

require('dotenv').config();
const events = require('./events.js');
const faker = require('faker')

events.on('delivered', delivered);

function delivered(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.randomOrderID}.`)
  console.log(`TIME: ` + Date.now() + `\nSTORE: ${payload.storeName}\nNAME: ${payload.randomName}\nADDRESS:${payload.randomAddress}\nORDER_ID: ${payload.randomOrderID}\n`);
}

setInterval( () => {
  const order = {
    storeName: process.env.STORENAME,
    randomName: faker.name.findName(),
    randomAddress: faker.address.cityName(),
    randomOrderID: Math.floor(Math.random() * 100)
  }
  console.log(`TIME: ` + Date.now())
  events.emit('pickup', order);
}, 3000)

module.exports = { delivered };