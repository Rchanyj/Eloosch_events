'use strict';

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
      days
    }
    // Post to database with event info
    console.log('posting event')
    DataHelpers.createEvent(newEvent)
<<<<<<< HEAD
      .then( (id) => res.status(200).send(id))
  });

  router.get("/:event_id", (req, res) => {
=======
      .then((id) => res.status(200).send(id))
  })
  router.get('/:event_id', (req, res) => {
>>>>>>> 7e25f7821261f16d8070f81e99e92c32ebf986ad
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
<<<<<<< HEAD

  });
=======
  })
>>>>>>> 7e25f7821261f16d8070f81e99e92c32ebf986ad

  router.post('/:event_id/votes', (req, res) => {
    // TESTER VOTING OBJECT
    // REMOVE THIS WHEN USING
    // curl -X POST http://localhost:8080/events/::unique_event_id/votes
    const votes = {

<<<<<<< HEAD
    name: "someName2",
    days: {
        "2017-11-01" : true,
        "2017-11-02" : true
=======
      name: 'someName2',
      days: {
        '2017-11-01': true,
        '2017-11-02': true
>>>>>>> 7e25f7821261f16d8070f81e99e92c32ebf986ad
      },
      hash: '',
      email: 'address'
    }
    // Post votes to database
    DataHelpers.submitVotes(req.params.event_id, votes)
      .then(post => res.json(post))
    // Callback res.render("/events/:id")
  })
  router.put('/:event_id/votes', (req, res) => {
    const votes = {
<<<<<<< HEAD
      name: "someName2",
      days: {
          "2017-11-01" : true,
          "2017-11-02" : true
        },
      hash: "8Q4ggFAphR6HbkPi",
      email: "address",
      }
=======
      name: 'someName2',
      days: {
        '2017-11-01': true,
        '2017-11-02': true
      },
      hash: '8Q4ggFAphR6HbkPi',
      email: 'address'
    }
>>>>>>> 7e25f7821261f16d8070f81e99e92c32ebf986ad
    // Edit votes in database
    DataHelpers.editVotes(req.params.event_id, votes)
      .then(edit => console.log(edit))
  })

  return router
};
