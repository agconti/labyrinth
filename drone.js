'use strict'
const uuid = require('uuid').v4
const request = require('./lib/networking')

function search(labyrinth, room) {
  return new Promise((res, rej) => {

    if (labyrinth.roomsVisited.has(room)) {
      console.log('last room', room, labyrinth.roomsVisited.has(room))
      return res(room)
    }

    labyrinth.roomsVisited.add(room)
    const occupiedDrone = labyrinth.availableDrones.shift()
    const exporeId = uuid()
    const readId = uuid()
    const commands = {
      exporeId: { "explore": room },
      readId: { "read": room }
    }

    request('POST', `drone/${drone}/commands`, commands).then(response => {
      console.log(`Drone ${drone} response ${JSON.stringify(response)}`)
      const connectedRooms = repsonse.exporeId.connections
      const writing = repsonse.readId

      labyrinth.availableDrones.push(occupiedDrone)
      labyrinth.writings.addWriting(writing)
      const promises = Promise.all(connectedRooms.map(room => search(room)))

      promises
      .then(results => {
        console.log("all promises have finished", results)
        res(results)
      })
      .catch(err => rej(err))
    })
  })
}

exports.search = search
