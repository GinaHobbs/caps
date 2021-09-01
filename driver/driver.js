'user strict'

const io = require('socket.io-client')
let host = 'http://localhost:3000';
const caps = io.connect(host)

caps.on('ready', payload => {
  setTimeout( () => {
    console.log(`DRIVER: picked up ${payload.randomOrderID}`)
    caps.emit('in-transit', payload)
  }, 1000)
})

// events.on('ready', pickup);

// function pickup(payload) {
//   setTimeout( () => {
//     console.log(`DRIVER: picked up ${payload.randomOrderID}`)
//     events.emit('in-transit', payload)
//   }, 1000)
// }

caps.on('drive', payload => {
  setTimeout( () => {
    console.log(`DRIVER: Delivered ${payload.randomOrderID}\n`)
    caps.emit('delivered', payload)
  }, 1000)
})

// events.on('in-transit', transit)

// function transit(payload) {
//   setTimeout( () => {
//     console.log(`DRIVER: Delivered ${payload.randomOrderID}\n`)
//     events.emit('delivered', payload)
//   }, 1000)
// }

module.exports = { } 