'use strict';

require('dotenv').config()

const PORT = process.env.PORT || 8080
const ENV = process.env.ENV || 'development';
const express = require('express')
const bodyParser = require('body-parser')
const sass = require('node-sass-middleware')
const app = express()

const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig[ENV])
const morgan = require('morgan')
const knexLogger = require('knex-logger')

const DataHelpers = require('./db/data-helpers.js')(knex)

// Seperated Routes for each Resource
const eventsRoutes = require('./routes/events')(DataHelpers)

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'))

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex))

<<<<<<< HEAD
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/votes", (req, res) => {
  console.log(req, ' <-- <--- <------- ', 'deanbug')
  res.render('voting')
})

app.use('/events', eventsRoutes)

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT)
})
