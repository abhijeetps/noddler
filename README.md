# Web Crawler NodeJS

Web Crawler build using NodeJS

## Description

A recursive web crawler built using NodeJS that harvest all possible hyperlinks belonging to a particular domain (default: [medium.com](https://medium.com)) and stores them in a CSV files. 

## Getting Started

To get started, clone this repository locally and move inside the repository directory

### Dependencies

* NodeJS 

### Installing

* In the project directory, type `npm install` to install all the packages and dependencies.
* Rename _.env.example_ to _.env_ and assign a PORT number (e.g. 3000) to it.
* To configure default URL to be crawled, open _config.js_ and update the value of key `url` to your own URL that you want to crawl.

### Executing program

To run the app, type the following command:

```
node index.js
```

Then visit localhost:PORT/crawl to start crawling.

The application will create CSV files of the app in _data/*.csv_ directory for every different pages that it will visit.


## Help

Are you struck while working with the app?
Or still have some doubt of how to work on it something. Please feel free to open an issue anytime.

## Authors

 [Abhijeet Singh](https://github.com/abhijeetps)
