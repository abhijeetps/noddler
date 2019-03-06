
const fs = require('fs')
const csv = require('fast-csv')
const path = require('path')
const randomstring = require('randomstring')

let write = (data) => {
  let fileName = randomstring.generate({
    length: 5,
    charset: 'alphabetic'
  })
  fileName = fileName + '.csv'
  let pathName = path.join(__dirname, fileName)
  let ws = fs.createWriteStream(pathName)
  csv
    .write(Array.from(data), { headers: true })
    .pipe(ws)
}

module.exports = write
