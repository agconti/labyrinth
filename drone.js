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
      const connectedRooms = repsonse.exporeId.connections
      const writing = repsonse.readId

      const payload = {connectedRooms, writing, drone}
      console.log("\n\npayload", payload)
      return payload
    })
}

function search (labyrinth, room, drone) {
  console.log(`Searching room ${room}...`)
  labyrinth.roomsVisited.add(room)
  console.log(`Labyrinth state ${JSON.stringify(labyrinth)}...`)

  return investigate(room, drone).then(result => {
    console.log(`\nInvestigation result ${result}`)
    labyrinth.availableDrones.push(result.finishedDrone)
    labyrinth.writings.push(result.writing)
    labyrinth.unSearchedRooms.push(...result.connectedRooms)
    console.log(`Labyrinth state ${JSON.stringify(labyrinth)}...`)
    console.log(labyrinth.unSearchedRooms.length > 0)

    while(labyrinth.unSearchedRooms.length > 0) {
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
