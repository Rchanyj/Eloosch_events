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
            creator: event.creator,
            create_date: knex.fn.now()
          }, "id")
        .into("events")
        .then(eventId => {
          event.days.forEach(day => (day.event_id = parseInt(eventId, 10)));
          return knex
            .batchInsert("event_days", event.days, event.days.length)
            .then(() => unique);
        });
    },
    getEvent: eventId => {
      return (result = knex("events")
        .join("event_days", "events.id", "event_days.event_id")
        .select("*"));
    },
    submitVotes: (eventId, votes) => {
      let newId;
      return knex
        .insert(
          {
            name: votes.name,
            email: votes.email,
            hash: votes.hash
          }, "id")
        .into("persons")
        .then(personId => {
          newId = personId;
          return knex("events")
            .join("event_days", "events.id", "event_days.event_id")
            .select("*")
            .where("events.event_link_id", eventId);
        })
        .then(eventDays => {
          return Promise.all(
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
        })
    },
    getVotes: () => {},
    deleteEvent: () => {}
  };
};
