"use strict";

const express = require("express");
const router = express.Router();
// Move knex to DataHelper.js

module.exports = (DataHelpers) => {
  router.post("/", (req, res) => {
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

    DataHelpers.createEvent(newEvent)
      .then( (id) => res.redirect("/events/" + id));
  });


  router.get("/:event_id", (req, res) => {
    // Retreive event info from db
    DataHelpers.getEvent(req.params.event_id)
    .then( res => console.log(res))
      // .then( event => res.render("events/:id", event))
  });
  router.put("/:event_id", (req, res) => {
    // Edit event info
    // DataHelpers.editEvent("event_id") RETURN {event}
    // Callback res.render("/events/event_:id")
  });
  router.delete("/:event_id", (req, res) => {
    // Delete event in database
    // DataHelpers.deleteEvent("id")
    // Callback res.render("/")
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
