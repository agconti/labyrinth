'use strict'

export class Labyrinth {
  constructor() {
    this.roomsVisited = new Set()
    this.unSearchedRooms = []
    this.availableDrones = []
    this.writings = []
  }
}
