"use strict";

const express = require("express");
const router = express.Router();
// Move knex to DataHelper.js

module.exports = (DataHelpers) => {
  router.post("/", (req, res) => {
<<<<<<< HEAD
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
      name : input.eventName,
      creator : input.creator,
      days
    }

=======
    // TESTER EVENT OBJECT
    // REMOVE THIS WHEN NEEDED TO USE
    // curl -X post http://localhost:8080/
    const newEvent = { 
      name : "testing event!",
      creator : "Tester McTest",
      days: [
        { event_date: "2017-11-01",
          event_start: "1700",
          event_end: "2100"
        },
        { event_date: "2017-11-02",
          event_start: "0000",
          event_end: "0000"
        }
      ]
    };
    // Post to database with event info
    console.log("posting event");
>>>>>>> server/routes
    DataHelpers.createEvent(newEvent)
      .then( (id) => res.status(200).send(id))
  });


  router.get("/:event_id", (req, res) => {
    DataHelpers.getEvent(req.params.event_id)
      .then(event => res.json(event))
  });
  router.put("/:event_id", (req, res) => {
    // Edit event info
    DataHelpers.editEvent(req.params.event_id, event)
    // Callback res.render("/events/event_:id")
  });
  router.delete("/:event_id", (req, res) => {
    DataHelpers.deleteEvent(req.params.event_id)
    
  });

  router.post("/:event_id/votes", (req, res) => {
    // TESTER VOTING OBJECT
    // REMOVE THIS WHEN USING
    // curl -X POST http://localhost:8080/events/::unique_event_id/votes
    const votes = {

    name: "someName2",
    days: { 
        "2017-11-01" : true,
        "2017-11-02" : true
      },
    hash: "",
    email: "address",
    }
    // Post votes to database
    DataHelpers.submitVotes(req.params.event_id, votes)
      .then( post => res.json(post))
    // Callback res.render("/events/:id")
  });
  router.put("/:event_id/votes", (req, res) => {
    const votes = {
      name: "someName2",
      days: { 
          "2017-11-01" : true,
          "2017-11-02" : true
        },
      hash: "8Q4ggFAphR6HbkPi",
      email: "address",
      }
    // Edit votes in database
    DataHelpers.editVotes(req.params.event_id, votes)
      .then( edit => console.log(edit))
  });

  return router;
};
