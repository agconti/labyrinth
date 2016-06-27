'use strict'
const writings = require('./writings')

class Labyrinth {
  constructor() {
    this.roomsVisited = new Set()
    this.writings = new Writings()
    this.availableDrones = []
  }
}

exports.Labyrinth = Labyrinth
