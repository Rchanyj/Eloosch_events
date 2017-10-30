const { randomKey } = require('./math')

module.exports = function makeDataHelpers (knex) {
  return {
    createEvent: event => {
      const newEventId = randomKey()
      const creatorId =
        event.creatorId !== 'undefined' ? event.creatorId : randomKey()
      console.log(event.creatorId)
      console.log(creatorId)
      return knex
        .insert(
          {
            event_link_id: newEventId,
            name: event.name,
            creator: creatorId,
            create_date: knex.fn.now()
          },
          'id'
        )
        .into('events')
        .then(eventId => {
          event.days.forEach(day => (day.event_id = parseInt(eventId, 10)))
          return knex.batchInsert('event_days', event.days, event.days.length)
        })
        .then(() => {
          if (event.creatorId === 'undefined') {
            return knex
              .insert(
                {
                  name: event.creator,
                  email: event.email,
                  hash: creatorId
                },
                'hash'
              )
              .into('persons')
          }
        })
        .then(() => {
          return { creatorId, newEventId }
        })
        .catch(err => console.log(err))
    },
    getEvent: eventId => {
      let eventData = { event: {}, votes: {} }
      return (
        knex('events')
          .join('event_days', 'events.id', 'event_days.event_id')
          .leftOuterJoin(
            'person_event_days',
            'person_event_days.event_day',
            'event_days.id'
          )
          .leftOuterJoin('persons', 'person_event_days.person_id', 'persons.id')
          .select(
            'events.name as event_name',
            'events.creator',
            'persons.name as person_name',
            'event_days.event_date',
            'event_days.event_start',
            'event_days.event_end',
            'persons.id as person_id',
            'persons.email',
            'persons.hash as person_hash',
            'person_event_days.vote'
          )
          .where('events.event_link_id', eventId)
          // Format results into object for client side
          .then(eventDays => {
            eventData.event = {
              name: eventDays[0].event_name,
              creator: eventDays[0].creator,
              days: []
            }
            eventDays.forEach(eventDay => {
              eventData.event.days.push(
                eventDay.event_date.toISOString().slice(0, 10)
              )
              if (!eventData.votes[eventDay.person_id]) {
                eventData.votes[eventDay.person_id] = {
                  id: eventDay.person_hash,
                  name: eventDay.person_name,
                  days: {}
                }
              }
              eventData.votes[eventDay.person_id]
                .days[eventDay.event_date.toISOString().slice(0, 10)] =
                eventDay.vote
            })
            return eventData
          })
          .catch(err => console.log(err))
      )
    },
    editEvent: (eventId, eventData) => {
      let voteStorage = []
      // Store all votes associated with event
      return knex('event_days')
        .join('events', 'event_days.event_id', 'events.id')
        .leftOuterJoin(
          'person_event_days',
          'person_event_days.event_day',
          'event_days.id'
        )
        .select(
          'events.id as event_id',
          'event_days.id as event_day_id',
          'event_days.event_date as event_date',
          'events.id as event_id',
          'person_event_days.id as vote_id',
          'person_event_days.vote as vote',
          'person_event_days.person_id'
        )
        .where('events.event_link_id', eventId)
        .then(eventDays => {
          voteStorage = eventDays
          return voteStorage
          // Delete all votes from database
        })
        .then(votes => {
          knex('person_event_days')
            .where('event_day', votes[0].event_day_id)
            .del()
            .then(() => {
              return knex('event_days')
                .where('event_id', votes[0].event_id)
                .del()
            })
            .catch(err => console.log(err))
          return votes
        })
        .then(votes => {
          // Rename event
          knex('events')
            .where('event_link_id', eventId)
            .update('name', eventData.name)
            .then(() => {
              eventData.days.forEach(day => {
                // Insert days
                knex
                  .insert({
                    event_id: votes[0].event_id,
                    event_date: day.event_date,
                    event_start: day.event_start,
                    event_end: day.event_end
                  })
                  .into('event_days')
                  .returning('id')
                  // Insert votes which still match
                  .then(eventDayId => {
                    for (let vote in votes) {
                      if (day.event_date === vote.event_date) {
                        knex.insert({
                          person_id: vote.person_id,
                          vote: vote.vote,
                          event_day: parseInt(eventDayId, 10)
                        })
                        break
                      }
                    }
                  })
              })
            })
        })
    },
    submitVotes: (eventId, votes) => {
      const hashId = votes.hash !== 'undefined' ? votes.hash : randomKey()
      if (votes.hash === 'undefined') {
        return knex
          .insert(
            {
              name: votes.name,
              email: votes.email,
              hash: randomKey()
            },
            'id'
          )
          .into('persons')
          .then(id => insertVotes(id))
      }
      return knex('persons')
        .select('id')
        .where('hash', votes.hash)
        .first()
        .then(id => insertVotes(id))

      function insertVotes (id) {
        return knex('events')
          .join('event_days', 'events.id', 'event_days.event_id')
          .select('*')
          .where('events.event_link_id', eventId)
          .then(eventDays => {
            Promise.all(
              eventDays.map(day => {
                const date = day.event_date.toISOString().slice(0, 10)
                return knex
                  .insert({
                    person_id: parseInt(id, 10),
                    event_day: parseInt(day.id, 10),
                    vote: votes.days[date]
                  })
                  .into('person_event_days')
              })
            )
            return hashId
          })
          .catch(err => console.log(err))
      }
    },
    editVotes: (eventId, votes) => {
      return Promise.all(
        Object.keys(votes.days).map(day => {
          return knex('persons')
            .join(
              'person_event_days',
              'persons.id',
              'person_event_days.person_id'
            )
            .join('event_days', 'person_event_days.event_day', 'event_days.id')
            .join('events', 'event_days.event_id', 'events.id')
            .where('persons.hash', votes.hash)
            .andWhere('events.event_link_id', eventId)
            .andWhere('event_days.event_date', `${day}T00:00:00.000Z`)
            .first('person_event_days.id as vote_id')
            .then(eventVote => {
              return knex('person_event_days')
                .where('id', eventVote.vote_id)
                .update('vote', votes.days[day])
            })
            .catch(err => console.log(err))
        })
      )
    },
    deleteEvent: eventID => {
      let subQuery = knex
        .select('event_days.id')
        .from('events')
        .innerJoin('event_days', 'events.id', 'event_days.event_id')
        .where('events.event_link_id', eventID)
      return (
        knex('person_event_days')
          .del()
          .whereIn('person_event_days.event_day', subQuery)
          // 2nd, delete entries from event_days table
          .then(() => {
            let subSelect = knex('events')
              .where('event_link_id', eventID)
              .select('id')
            return knex('event_days')
              .del()
              .whereIn('event_id', subSelect)
            // 3rd, delete the event row from events table
          })
          .then(() => {
            return knex('events')
              .where('event_link_id', eventID)
              .del()
          })
      )
    }
    // getTotAttendees: (eventID) => {
    // getTotAttendees: function (eventID) {
    //   const eventAttendeesCount = await
    //     knex('events').countDistinct('person_event_days.person_id')
    //       .innerJoin('event_days', 'events.id', 'event_days.event_id')
    //       .innerJoin('person_event_days', 'event_days.id', 'person_event_days.event_day')
    //       .where('events.event_link_id', eventID)
    //   return eventAttendeesCount
    // }
  }
}
