"use strict";

const express = require("express");
const router = express.Router();

// Move knex to DataHelper.js

module.exports = () => {
  router.post("/", (req, res) => {
    // Post to database with event info
    // DataHelpers.createEvent("id", eventName, localStorage.hash) RETURN {event}
    // Callback res.render("/events/:id")
  });
  router.get("/:event_id", (req, res) => {
    // Retreive event info from db
    // DataHelpers.getEvent("id") RETURN {event}
    // Callback res.render("/events/:id")
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
    // Post votes to database
    // DataHelpers.submitVotes("event_id", {votes}) RETURN {event}
    // Callback res.render("/events/:id")
  });
  router.put("/:event_id/votes", (req, res) => {
    // Edit votes in database
    // DataHelpers.editVotes("event_id, {votes}") RETURN {event}
    // Callback res.render("/event/:id", {event})
  });

  return router;
};

// {votes} = {
//   attendee: "someName",
//   days: {
//     Date: true,
//     Date: false,
//     Date: true
//   }
//   hash: localStorage.hash,
//   email: "address",
// }


// {event} = {
//   creatorId,
//   event_name,
//   days: [
//     2017-10-30: {
//       times: {
//         start: 1300
//         end: 1900
//       }
//       attendees: {
//         person1 : true,
//         person2 : false,
//       }
//     },
//     2017-10-31: {
//       times: {
//         start: 1900
//         end: 2300
//       },
//       attendees: {
//         person1: false,
//         person2: true,
//       }
//     }
//   ],  
// }