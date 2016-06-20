'use strict'
const r = require('request')
const config = require('../config')
const domain = config.domain
const headers = config.headers

function request(method, resource, body) {
  const url = `${domain}/${resource}`
  const json = true
  const options = {url, headers, method, json, body}

  return new Promise((resolve, reject) => {
      console.log(`New Request ${JSON.stringify(options)}`)
      r(options, (err, response, body) => {
          if (err) {
            throw error
          }
          const status = response.statusCode
          console.log(`\n\n${status}\n\n`)

          if(response.statusCode >= 400) {
              throw new Error(`API Error. Status: ${status}`)
          }

          return resolve(body)
      })
  })
}

module.exports = request
