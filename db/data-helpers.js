module.exports = function makeDataHelpers(knex) {
  return {
    createEvent: event => {
      knex
        .insert(
          {
            name: event.name,
            creator: event.creator,
            create_date: event.create_date
          },
          "id"
        ).into("events")
        .then(eventId =>
          event.days.forEach(day => {
            knex.insert({
              event_id: eventId,
              event_day: day.event_day,
              event_start: day.event_start,
              event_end: day.event_end
            });
          })
        ).then( done => console.log(done))
      // .then( eventId => knex.batchInsert("event_days", event.days)
      // .then( days => console.log(days))

      // })
    },
    getEvent: () => {},
    submitVotes: () => {},
    getVotes: () => {},
    deleteEvent: () => {}
  };
};
