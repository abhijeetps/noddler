
const fs = require('fs')
const csv = require('fast-csv')
const path = require('path')

let write = (data) => {
  let fileName = 'data.csv'
  let pathName = path.join(__dirname, fileName)
  let ws = fs.createWriteStream(pathName, { flags: 'a' })
  csv
    .write(Array.from(data), { headers: true })
    .pipe(ws)
}

module.exports = write
