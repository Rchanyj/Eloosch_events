exports.seed = function(knex, Promise) {
  // Deletes events ALL existing entries
  return knex('person_event_days').del()
    .then( () => knex.raw('ALTER SEQUENCE person_event_days_id_seq RESTART WITH 1'))
    .then( () => knex('persons').del())
    .then( () => knex.raw('ALTER SEQUENCE persons_id_seq RESTART WITH 1'))    
    .then( () =>  knex('event_days').del())
    .then( () => knex.raw('ALTER SEQUENCE event_days_id_seq RESTART WITH 1'))    
    .then( () => knex('events').del())
    .then( () => knex.raw('ALTER SEQUENCE events_id_seq RESTART WITH 1'))    
    .then(function () {
      return knex('events').insert([
        {name: 'holiday', 
        creator: 'sdfdfnnn355ndjfnsdfn8ksfnsdfnn32nnsdjnjsdfn', create_date: '2017-08-16',
        event_link_id: '8jhf7ksdn5dsfn8a'}, //8jhf7ksdn5dsfn8a
        {name: 'birthday', 
        creator: 'j87xg5f29j5ndjfnsdfn8ksfnsdfnn32nnsdjnjsdfn', create_date: '2017-08-17',
        event_link_id: 'o9ff7ksdn5dsfn8a'},
        {name: 'anniversary', 
        creator: '9kj4dynn355ndjfnsdfn8ksfnsdfnn32nnsdjnjsdfn', create_date: '2017-08-18',
        event_link_id: 'j5gf7ksdn5dsfn8a'}
      ]);
    })
  // Deletes event_days ALL existing entries
    .then(function () {
      return knex('event_days').insert([
        // Inserts seed entries
        {event_id: 1, event_date: '2017-10-26',
         event_start: '12:25:00', event_end: '13:45:00'},
         {event_id: 1, event_date: '2017-10-27',
         event_start: '12:25:00', event_end: '13:45:00'},
         {event_id: 1, event_date: '2017-10-28',
         event_start: '12:25:00', event_end: '13:45:00'},
         // next event
         {event_id: 2, event_date: '2017-10-29',
         event_start: '09:00:00', event_end: '11:30:00'},
         //next event
        {event_id: 3, event_date: '2017-10-30',
        event_start: '12:00:00', event_end: '16:00:00'},
        {event_id: 3, event_date: '2017-11-06',
        event_start: '08:15:00', event_end: '10:30:00'}
      ]);
    })
    // Deletes persons ALL existing entries
    .then(function () {
      return knex('persons').insert([
        // Inserts seed entries
        {name: 'Billy Bob Thornten',
        email: 'hollywoodbilly@gmail.com',
        hash: 'sdfdfnnn355ndjfnsdfn8ksfnsdfnn32nnsdjnjsdfn'},
        {name: 'Billy Joel',
        email: 'soulman@gmail.com',
        hash: 'sdfdsdkfskdlf8fnnn3n8ksfnsdfnn32nnsdjnjsdfn'},
        {name: 'Freddie Kruger',
        email: 'fridaythe13th@gmail.com',
        hash: 'fllf,sf,56355ndjsdfn8ksfnsdfnn32nnsdjnjsdfn'},
        {name: 'Buster Keaton',
        email: 'oldschool@gmail.com',
        hash: 'kjs7h20n355ndjfnsdfn8ksfnsdfnn32nnsdjnjsdfn'},
        {name: 'Foo Bar',
        email: 'snafu@gmail.com',
        hash: '9ksh6enn355ndjfnsdfn8ksfnsdfnn32nnsdjnjsdfn'},
        {name: 'Supercallafragelicious',
        email: 'disneymovie@gmail.com',
        hash: 'j87xg5f29j5ndjfnsdfn8ksfnsdfnn32nnsdjnjsdfn'},
        {name: 'Billy the Kid',
        email: 'theoutlaws@gmail.com',
        hash: '9kj4dynn355ndjfnsdfn8ksfnsdfnn32nnsdjnjsdfn'}
      ]);
    })
  // Deletes person_event_days ALL existing entries
  .then(function () {
    return knex('person_event_days').insert([
      // Inserts seed entries
      {person_id: 1, event_day: 1, vote: true},
      {person_id: 2, event_day: 1, vote: false},
      {person_id: 3, event_day: 2, vote: false},
      {person_id: 4, event_day: 2, vote: true},
      {person_id: 1, event_day: 3, vote: true},
      {person_id: 5, event_day: 3, vote: false},
      {person_id: 5, event_day: 3, vote: true},
      {person_id: 6, event_day: 4, vote: false},
      {person_id: 7, event_day: 5, vote: true},
      {person_id: 3, event_day: 6, vote: false},
      {person_id: 2, event_day: 3, vote: true},
      {person_id: 4, event_day: 2, vote: true},
      {person_id: 2, event_day: 1, vote: true}      
    ]);
    })
};
