
const fs = require('fs')
const csv = require('fast-csv')
const randomstring = require('randomstring')

let write = (data) => {
  let fileName = randomstring.generate({
    length: 5,
    charset: 'alphabetic'
  })
  fileName = __dirname + '/' + fileName + '.csv'
  let ws = fs.createWriteStream(fileName);
  csv
    .write(Array.from(data), {headers: true})
    .pipe(ws)
}

module.exports = write
