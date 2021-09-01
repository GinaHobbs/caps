'user strict'

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

// Global Connection Hub
io.on('connection', socket => {
  console.log('__GLOBAL__', socket.id);

  socket.on('pickup', payload => {
    console.log(`Order ready for pickup.\nSTORE: ${payload.storeName}\nNAME: ${payload.randomName}\nADDRESS:${payload.randomAddress}\nORDER_ID: ${payload.randomOrderID}\n`);
    io.emit('ready', payload)
  })

  socket.on('in-transit', payload => {
    console.log(`CAPS: Pickup message for order number ${payload.randomOrderID} has been received.`)
    io.emit('drive', payload);
  })

  socket.on('delivered', payload => {
    console.log('CAPS: Notifying vendor.')
    io.emit('finalized', payload)
  })
});

// events.on('pickup', pickup);

// function pickup(payload) {
//   console.log(`Order ready for pickup.\nSTORE: ${payload.storeName}\nNAME: ${payload.randomName}\nADDRESS:${payload.randomAddress}\nORDER_ID: ${payload.randomOrderID}\n`);
//   events.emit('ready', payload)
// }

// events.on('in-transit', received)
// events.on('delivered', delivered)

// function received() {
//   console.log('CAPS: Pickup message has been received.')
// }

// function delivered(payload) {
//   console.log('CAPS: Notifying vendor.')
//   events.emit('finalized', payload)
// }

module.exports = { };
