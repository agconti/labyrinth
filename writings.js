'use strict'

function constructMessage (writings) {
    writings.sort((a, b) => a.order - b.order)
    return writings.join(" ")
}

module.exports = constructMessage
