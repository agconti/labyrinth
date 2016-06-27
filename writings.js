'use strict'

class Writings {
  constructor() {
    this.writings = []
  }
  addWriting(writing) {
    if (writing.position === -1) {
      return
    }

    this.writings.push(writings)
  }
  constructMessage () {
    this.writings.sort((a, b) => a.order - b.order)
    return writings.join(" ")
  }
}

module.exports = constructMessage
