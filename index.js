const request = require('./lib/networking')
const drone = require('./drone')
const constructMessage = require('./writings')
const Labyrinth = require('./Labyrinth').Labyrinth
const labyrinth = new Labyrinth()

console.log(labyrinth)
request('GET', 'start')
   .then(data => {
     console.log('now to searching,', data)
     return drone.search(labyrinth, data.roomId, data.drones[0])
   })
   .then(writings => {
     console.log('on to message writing,', writings)
     return constructMessage(writings)
   })
   .then(message => request('POST', 'report'))
   .then(response => console.log(response))
