const { randomKey } = require("./math");

module.exports = function makeDataHelpers(knex) {
  return {
    createEvent: event => {
      const unique = randomKey();
      return knex
        .insert(
          {
            event_link_id: unique,
            name: event.name,
            creator: randomKey(),
            create_date: knex.fn.now()
          },
          "id"
        )
        .into("events")
        .then(eventId => {
          event.days.forEach(day => (day.event_id = parseInt(eventId, 10)));
          return knex
            .batchInsert("event_days", event.days, event.days.length)
            .then(() => unique)
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    getEvent: eventId => {
      let eventObj = { event: {}, votes: {} };
      return knex("events")
        .join("event_days", "events.id", "event_days.event_id")
        .join(
          "person_event_days",
          "person_event_days.event_day",
          "event_days.event_id"
        )
        .join("persons", "person_event_days.person_id", "persons.id")
        .select("events.name as event_name", "*")
        .where("events.event_link_id", eventId)
        .then(eventDays => {
          console.log(eventDays);
          eventObj.event = {
            name: eventDays[0].event_name,
            creator: eventDays[0].creator
          };
          eventDays.map(daysVotedOn => {
            if (!eventObj.votes[daysVotedOn.id]) {
              eventObj.votes[daysVotedOn.id] = {
                id: daysVotedOn.hash,
                name: daysVotedOn.name,
                days: {}
              };
            }
            if (eventObj.votes[daysVotedOn.person_id]) {
              eventObj.votes[daysVotedOn.person_id].days[
                daysVotedOn.event_date.toISOString().slice(0, 10)
              ] =
                daysVotedOn.vote;
            }
          });
          return eventObj;
        })
        .catch(err => console.log(err));
    },

    submitVotes: (eventId, votes) => {
      let newId;
      let hashId = randomKey();
      return knex
        .insert(
          {
            name: votes.name,
            email: votes.email,
            hash: votes.hash || hashId
          },
          "id"
        )
        .into("persons")
        .then(personId => {
          newId = personId;
          return knex("events")
            .join("event_days", "events.id", "event_days.event_id")
            .select("*")
            .where("events.event_link_id", eventId);
        })
        .then(eventDays => {
          Promise.all(
            eventDays.map(day => {
              const date = day.event_date.toISOString().slice(0, 10);
              return knex
                .insert({
                  person_id: parseInt(newId, 10),
                  event_day: parseInt(day.id, 10),
                  vote: votes.days[date]
                })
                .into("person_event_days");
            })
          );
          return hashId;
        })
        .catch(err => console.log(err));
    },
    editVotes: (eventId, votes) => {
      return Promise.all( Object.keys(votes.days).map( day => {
        return knex("persons")
          .join("person_event_days", "persons.id", "person_event_days.person_id")
          .join("event_days", "person_event_days.event_day", "event_days.id")
          .join("events", "event_days.event_id", "events.id")
          .where("persons.hash", votes.hash)
          .andWhere("events.event_link_id", eventId)
          .andWhere("event_days.event_date", `${day}T00:00:00.000Z`)
          .first("person_event_days.id as vote_id")
          .then( eventVote => {
            return knex("person_event_days").where("id", eventVote.vote_id)
              .update("vote", votes.days[day])
          })
          .catch(err => console.log(err))
        
      })
    )
    },
    deleteEvent: eventId => {}
  };
};
// const votes = {
//   name: "someName2",
//   days: { 
//       "2017-11-01" : true,
//       "2017-11-02" : true
//     },
//   hash: "8Q4ggFAphR6HbkPi",
//   email: "address",
//   }