'use strict'

async function search (labyrinth, room, drone) {
  console.log(`Searching room ${room}...`)
  console.log(`Labyrinth state ${JSON.stringify(labyrinth)}...`)
  labyrinth.roomsVisited.add(room)
  const {connectedRooms, writing, finishedDrone} = await investigate(room, drone)

  labyrinth.availableDrones.push(finishedDrone)
  labyrinth.writings.push(writing)
  labyrinth.unSearchedRooms.push(...connectedRooms)
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
}

async function investigate(room, drone) {
    const exporeId = uuid()
    const readId = uuid()
    const commands = {
        exporeId: { "explore": room },
        readId: { "read": room }
    }

    console.log(`investigatng room ${room}, with drone ${drone}`)
    const repsonse = await request('POST', `/drone/${drone}/commands`, commands)
    const connectedRooms = repsonse.exporeId
    const writing = repsonse.readId
    return {connectedRooms, writing, drone}
}

module.exports.search = search
module.exports.investigate = investigate
