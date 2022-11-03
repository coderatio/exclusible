import WS from 'App/Services/WebSocketService'
WS.boot()

/**
 * Listen for incoming socket connections
 */
/*WS.io.on('connection', (socket) => {
  socket.emit('rates', { BTC_USD: { buy: 100, sell: 80 } })

  socket.on('client_event', (data) => {
    console.log(data)
  })
})*/
