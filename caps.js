'user strict'

const events = require('./events.js');
require('./vendor.js');
require('./driver.js');

events.on('pickup', pickup);

function pickup(payload) {
  console.log(`Order ready for pickup.\nSTORE: ${payload.storeName}\nNAME: ${payload.randomName}\nADDRESS:${payload.randomAddress}\nORDER_ID: ${payload.randomOrderID}\n`);
  events.emit('transit');
}

module.exports = { pickup }
