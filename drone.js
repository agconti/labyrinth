'use strict'
const uuid = require('uuid').v4
const request = require('./lib/networking')

function investigate(room, drone) {
    const exporeId = uuid()
    const readId = uuid()
    const commands = {
        exporeId: { "explore": room },
        readId: { "read": room }
    }

    console.log(`investigatng room ${room}, with drone ${drone}`)
    return request('POST', `drone/${drone}/commands`, commands).then(response => {
      console.log(`Drone ${drone} response ${JSON.stringify(response)}`)
      const connectedRooms = repsonse.exporeId
      const writing = repsonse.readId

      return {connectedRooms, writing, drone}
    })
}

function search (labyrinth, room, drone) {
  console.log(`Searching room ${room}...`)
  console.log(`Labyrinth state ${JSON.stringify(labyrinth)}...`)
  labyrinth.roomsVisited.add(room)

  return investigate(room, drone).then(result => {
    console.log(`\nInvestigation result ${result}`)
    labyrinth.availableDrones.push(result.finishedDrone)
    labyrinth.writings.push(result.writing)
    labyrinth.unSearchedRooms.push(...result.connectedRooms)

    while(labyrinth.unSearchedRooms) {
      const nextRoom = labyrinth.unSearchedRooms.shift()
      console.log(`Trying room ${nextRoom}...`)

      if (labyrinth.roomsVisited.has(nextRoom)) {
        console.log(`Room ${nextRoom} has already been visited`)
        return
      }

      // need some way to handel all 5?
      const idleDrone = labyrinth.availableDrones.shift()
      search(nextRoom, idleDrone)
    }

    return writings
  })

}

exports.search = search
exports.investigate = investigate
