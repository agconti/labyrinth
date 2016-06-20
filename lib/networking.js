'use strict'
const r = require('request')
const conifg = require('../config')
const domain = config.domain
const headers = config.headers

export function request(method, resource, body) {
  const url = `${domain}/${resource}`
  const json = true
  const options = {url, headers, method, json, body}

  return new Promise((reject, resolve) => {
      r(options, (err, response, body) => {
          if (err || response.statusCode >= 400) {
              return reject(err)
          }

          return resolve(body)
      })
  })
}
