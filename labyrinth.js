'use strict'

class Labyrinth {
  constructor() {
    this.roomsVisited = new Set()
    this.unSearchedRooms = []
    this.availableDrones = []
    this.writings = []
  }
}

exports.Labyrinth = Labyrinth
