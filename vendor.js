'user strict'

require('dotenv').config();
const events = require('./events.js');
const faker = require('faker')

//https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

events.on('finalized', thanks);

function thanks(payload) {
  setTimeout( () => {
    console.log(`VENDOR: Thank you for delivering ${payload.randomOrderID}.\n`)
    console.log(`TIME: ` + Date.now() + `\nSTORE: ${payload.storeName}\nNAME: ${payload.randomName}\nADDRESS:${payload.randomAddress}\nORDER_ID: ${payload.randomOrderID}\n`);
  }, 1000)
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
}, 5000)

module.exports = { thanks };