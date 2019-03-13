
const express = require('express')
let app = express()

require('dotenv').config()

const request = require('request')
const cheerio = require('cheerio')
const url = require('url')
const validUrl = require('valid-url')
const write = require('./data/write')
const config = require('./config')
const http = require('http')
const https = require('https')

let hasBeenVisited = new Set([])
let toCrawlURL = []

http.globalAgent.maxSockets = 5
https.globalAgent.maxSockets = 5

app.get('/', (req, res) => {
  res.send('<h1>App is now working</h1>')
})

app.get('/crawl', (req, res) => {
  console.log(`Crawling ${config.url}:`)
  toCrawlURL = []
  toCrawlURL.push(config.url)
  crawl(toCrawlURL)
  res.send(`<h1>Crawling <a href="${config.url}">${config.url}</a><h1>`)
})

let crawl = async (toCrawlURL) => {
  if (toCrawlURL.length > 0 && typeof toCrawlURL !== 'undefined') {
    let currURL = toCrawlURL.shift()
    let URLs = []
    let data = {}
    if (!hasBeenVisited.has(currURL)) {
      hasBeenVisited.add(currURL)
      await request(currURL, (err, res, html) => {
        process.stdout.write('.')
        if (err) {
          console.log(err)
        } else if (res.statusCode === 200) {
          const $ = cheerio.load(html)
          $('a').each((i, x) => {
            const link = $(x).attr('href')
            if (validUrl.isUri(link) && link.includes(url.parse(currURL).host)) {
              let { href, query } = url.parse(link)
              href = href.split('?')[0]
              if (!query) {
                query = ''
              } else {
                query = Object.keys(query)
              }
              toCrawlURL.push(href)

              URLs.push({ href, query })

              data = [...new Set(URLs.map(x => x.href))].map(
                x => {
                  return {
                    href: x,
                    reference_count: URLs.filter(y => y.href === x).length,
                    params: URLs.find(z => z.href === x).query
                  }
                }
              )
            }
          })
          write(data)
          crawl(toCrawlURL)
        }
      })
    } else {
      crawl(toCrawlURL)
    }
  }
}

app.listen(process.env.PORT, (req, res) => {
  console.log(`App is running on PORT ${process.env.PORT}`)
  console.log(`Visit http:/localhost:${process.env.PORT}/crawl to start crawling.`)
})
