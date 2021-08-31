'user strict'

const { delivered } = require('./vendor.js')

//https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const events = require('./events.js');

events.on('pickup', pickedUp);

function pickedUp(payload) {
  sleep(1000);
  console.log(`DRIVER: picked up ${payload.randomOrderID}`)
  events.emit('in-transit', transit)
}

events.on('in-transit', transit)

function transit(payload) {
  sleep(1000)
  console.log(`DRIVER: Delivered ${payload.randomOrderID}`)
  events.emit('delivered', delivered)
}

module.exports = { pickedUp, transit } 