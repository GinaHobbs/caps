'user strict'

const events = require('./events.js');

events.on('ready', pickup);

function pickup(payload) {
  setTimeout( () => {
    console.log(`DRIVER: picked up ${payload.randomOrderID}`)
    events.emit('in-transit', payload)
  }, 1000)
}

events.on('in-transit', transit)

function transit(payload) {
  setTimeout( () => {
    console.log(`DRIVER: Delivered ${payload.randomOrderID}\n`)
    events.emit('delivered', payload)
  }, 1000)
}

module.exports = { pickup, transit } 