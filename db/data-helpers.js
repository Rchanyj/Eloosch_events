module.exports = function makeDataHelpers (knex) {
  return {
    createEvent: (event) => {
      console.log(event);
      knex.insert([{name: event.name}, {creator: event.creator}]).into("Event")
        .then( done => console.log(done));
    },
    getEvent: () => {

    },
    submitVotes: () => {

    },
    getVotes: () => {

    },
    deleteEvent: () => {
      
    }
  }
}