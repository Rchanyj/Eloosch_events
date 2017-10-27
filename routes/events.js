"use strict";

const express = require("express");
const router = express.Router();
// Move knex to DataHelper.js

module.exports = (DataHelpers) => {
  router.post("/", (req, res) => {
    // TESTER EVENT OBJECT
    // REMOVE THIS WHEN NEEDED TO USE
    // curl -X post http://localhost:8080/
    const newEvent = { 
      name : "testing event!",
      creator : "Tester McTest",
      days: [
        { event_date: "2017-11-01",
          event_start: 1700,
          event_end: 2100
        },
        { event_date: "2017-11-02",
          event_start: "0000",
          event_end: "0000"
        }
      ]
    };
    // Post to database with event info
    DataHelpers.createEvent(newEvent)
      .then( (id) => res.redirect("/events/" + id));
  });
  router.get("/:event_id", (req, res) => {
    DataHelpers.getEvent(req.params.event_id)
      .then(event => console.log(event))
      // .then( res => console.log(res))
      // .then( event => res.render("events/:id", event))
  });
  router.put("/:event_id", (req, res) => {
    // Edit event info
    // DataHelpers.editEvent("event_id") RETURN {event}
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
    name: "someName",
    days: { 
        "2017-11-01" : false,
        "2017-11-02" : true
      },
    hash: "RANDOM_INT",
    email: "address",
    }
    // Post votes to database
    DataHelpers.submitVotes(req.params.event_id, votes)
      .then( res => console.log(res))
    // Callback res.render("/events/:id")
  });
  router.put("/:event_id/votes", (req, res) => {
    // Edit votes in database
    // DataHelpers.editVotes("event_id, {votes}") RETURN {event}
    // Callback res.render("/events/:id", {event})
  });

  return router;
};




// const result = {
//   event : {
//     name: "Birthday",
//     creator: "hash",
//     creator_name: "Donald",
//     email: "email@email.email"
//   },
//   votes: [
//     { name: "Algernon",
//       days: {
//         "2017-11-01" : false,
//         "2017-11-02" : true
//       }
//     },
//     { name: "Earnest",
//       days: {
//         "2017-11-01" : true,
//         "2017-11-02" : true
//       }
//     }
//   ]
// }
