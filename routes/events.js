'use strict'

const express = require('express')
const router = express.Router()
// Move knex to DataHelper.js

module.exports = (DataHelpers) => {
  router.post('/', (req, res) => {
    const input = req.body
    const days = []
    for (let key in input) {
      if (key.startsWith('date')) {
        let eventDay = {
          event_date: input[key],
          event_start: '0000',
          event_end: '0000'
        }
        days.push(eventDay)
      }
    }
    const newEvent = {
      name: input.eventName,
      creator: input.creator,
      creatorId: input.creatorId,
      days
    }
    // Post to database with event info
    DataHelpers.createEvent(newEvent)
      .then((ids) => {
        res.status(200).json(ids)
      })
  })

  // Renders voting page
  router.get('/:event_id', (req, res) => {
    DataHelpers.getEvent(req.params.event_id)
      .then(event => {
        const templateVars = {
          eventData: event
        }
        res.render('voting', templateVars)
      })
  })
  // Fetches event obj from db for use in calendar
  router.get('/:event_id/json', (req, res) => {
    DataHelpers.getEvent(req.params.event_id)
      .then(event => res.json(event))
  })

  router.put('/:event_id', (req, res) => {
    // Edit event info
    const event = {
      name: 'CHANGED!',
      creator: 'fllf,sf,56355ndjsdfn8ksfnsdfnn32nnsdjnjsdfn',
      days: [
        {
          event_date: '2017-11-02',
          event_start: '0000',
          event_end: '0000'
        },
        {
          event_date: '2017-11-03',
          event_start: '0000',
          event_end: '0000'
        },
        {
          event_date: '2017-11-10',
          event_start: '0000',
          event_end: '0000'
        }
      ]
    }
    DataHelpers.editEvent(req.params.event_id, event)
      .then(data => res.json(data))
  })

  router.delete('/:event_id', (req, res) => {
    DataHelpers.deleteEvent(req.params.event_id)
  })
  router.post('/:event_id/votes', (req, res) => {
<<<<<<< HEAD
=======
    // TESTER VOTING OBJECT
    // REMOVE THIS WHEN USING
    // curl -X POST http://localhost:8080/events/::unique_event_id/votes
    // Post votes to database
    console.log(req.body)

>>>>>>> 65c3ddebece6eb9d0de9f5fb5303ff91f81cf19a
    DataHelpers.submitVotes(req.params.event_id, req.body)
      .then(id => res.json(id))
  })
  router.put('/:event_id/votes', (req, res) => {

    // Edit votes in database
    DataHelpers.editVotes(req.params.event_id, votes)
      .then(edit => console.log(edit))
  })

  return router
}
