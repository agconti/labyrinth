const request = require('request')
const uuid = require('uuid').v4
const request = require('./lib/networking')
const drone = require('./drone')
const constructMessage = require('./writings')
const labyrinth = new require('./labyrinth').Labyrinth

request('GET', 'start')
   .then(data => drone.search(labyrinth, data.roomId, data.drones))
   .then(writings => constructMessage(writings))
   .then(message => request('POST', 'report'))
   .catch(err => console.error(err))
