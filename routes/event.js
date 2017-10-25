"use strict";

const express = require("express");
const router = express.Router();

// Move knex to DataHelper.js

module.exports = knex => {
  router.get("/", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then(results => {
    //     res.json(results);
    //   });
  });
  router.post("/", (req, res) => {
    // Post to database with event info
    // DataHelpers.createEvent("id", eventName, localStorage.hash) RETURN {event}
    // Callback res.render("/event/:id")
  });
  router.get("/:id", (req, res) => {
    // Retreive event info from db
    // DataHelpers.getEvent("id") RETURN {event}
    // Callback res.render("/event/:id")
  });
  router.post("/:id", (req, res) => {
    // Post votes to database
    // DataHelpers.submitVotes("id", {votes}) RETURN {event}
    // Callback res.render("/event/:id")
  });
  router.put("/:id", (req, res) => {
    // Edit votes in database
    // DataHelpers.editVotes("id, {votes}") RETURN {event}
    // Callback res.render("/event/:id", {event})
  });
  router.delete("/:id", (req, res) => {
    // Delete event in database
    // DataHelpers.deleteEvent("id")
    // Callback res.render("/")
  });
  return router;
};

// {votes} = {
//   event_id,
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