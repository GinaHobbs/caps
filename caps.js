'user strict'

const { emit } = require('process');
const events = require('./events.js');
require('./vendor.js');
require('./driver.js');

events.on('pickup', pickup);

function pickup(payload) {
  console.log(`Order ready for pickup.\nSTORE: ${payload.storeName}\nNAME: ${payload.randomName}\nADDRESS:${payload.randomAddress}\nORDER_ID: ${payload.randomOrderID}\n`);
  events.emit('ready', payload)
}

events.on('in-transit', received)
events.on('delivered', delivered)

function received() {
  console.log('CAPS: Pickup message has been received.')
}

function delivered(payload) {
  console.log('CAPS: Notifying vendor.')
  events.emit('finalized', payload)
}

module.exports = { pickup }
