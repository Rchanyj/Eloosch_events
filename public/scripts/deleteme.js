$(document).ready(function() {
  const $submitVote = $('#confirm_avail');
  const $voteForm = $('#confirm_avail_form');
  let datesArray = [];
  var dates = {};


/* ========================================================= */
// Initial guest availability calendar //
/* ==================================== */

  $('#calendar').fullCalendar({

      dayClick: function(date, jsEvent, view) {
      // toggle day color with clicks (by adding a new class to the clicked element)
        if (!$voteForm.hasClass('locked')) {
          const dateClicked = this[0].dataset.date;
          if ($(this).hasClass('selected')) {
            datesArray = datesArray.filter( a => a !== dateClicked );
          } else {
            datesArray.push(dateClicked);
          };
          $(this).toggleClass('selected');
        };
      },
      eventLimit: true //displays events without stretching box size
  });

/*====================================================*/
  // USER /CALENDAR INTERACTIONS //
/*====================================================*/
  //render event (name, highlights)
  function renderEvent(event) {
    //select (highlight) dates in db event entry
    event.event.days.forEach( date => {
      console.log(date);
      $('#calendar').fullCalendar('select', date);
    }); //find a way to make the selections persist even if other months are accessed

    //render each guest name and their votes
    for(guest in event.votes) {
      if (!guest){
        for(date in event.votes[guest].days) {
          console.log(date);
          const eventObj = {
          title: event.votes[guest].name,
          allDay: true,
          start: date,
          eventOrder: 'title'
          };
          $('#calendar').fullCalendar('renderEvent', eventObj, true);
        };
      }
    };
  }


  //Fetch event data from db, render event and availabilities on cal-----------------------/
  function loadEvent() {
    const eventId = window.location.pathname;
    $.ajax({
      method: 'GET',
      url: `${eventId}/json`
    }).done(function(event) {
      renderEvent(event)
    })
  }

  loadEvent()

  //Create string of voter data for ajax to submit to db
    //Submit an object of selected dates, with date : true
  function createVotesData() {
    const email = $('#email-input').val();
    if (!email) {
      email = null;
    }
    datesArray.forEach(function (date) {
      dates = {
        date : true
      };
    });
    const votes = {
      name: $('#confirm_avail_form').guestName,
      days: dates,
      email: email,
      hash: localStorage.userId
    };
    voteData = votes.serialize();
    return voteData;
  }

  //POST event when user FIRST submits availability: -------------
  function submitVotes() {
    event.preventDefault();
    const votesData = createVotesData();
    console.log(queryStr); //comment this out in final code
    $.ajax({
      url: '/:event_id/votes', // need to know event id [URL]
      method: 'POST',
      data: votesData
    }).done(function(){
      //load event cal with user's newly submitted avail
      loadEvent();
      //lock fields
      $voteForm.addClass('locked');
      //Confirm button disappears:
      $submitVote.hide();
      //Edit button appears
      $('#edit_avail').show();
    });
  }


  // CANCEL EDIT ---------------------------------/
  //discards selected fields, re-renders the previous state of the page
  function returnPrevious() {
    $.ajax({
      url: '/:event_id',
      method: 'GET',
    }).done(function() {
      //render previous state
      loadEvent();
      //locks fields again
      $voteForm.addClass('locked');
      $(this).hide();
      $('#confirm_changes').hide();
      $('#edit_avail').show();
    });
  }

  //Submit updated availability -----------------------
  //Submits a PUT request that OVERWRITES old entries for that particular user/date
  function updateVotes() {
    const votesData = createVotesData();
    $.ajax({
      url: '/:event_id/votes',
      method: 'PUT',
      data: votesData
    }).done(function () {
      loadEvent();
      $voteForm.addClass('locked');
      $(this).hide();
      $('#cancel_edit').hide();
      $('#edit_avail').show();
    });
  }

  //Create new event data to submit
  function createEventUpdate() {
    var newEvent = {};
    var eventDays = daysArray.map(function(day) {
        day = {
          event_date: day,
          event_start: '0000',
          event_end: '0000'
        }
      });
    newEvent = {
      name: input.eventName,
      creator: input.creator,
      days : eventDays
    };
  }

  //Updates event dates in db, renders new event dates
  function updateEvent() {
    const eventUpdate = createEventUpdate();
    $.ajax({
      url: '/:event_id',
      method: 'PUT',
      data: eventUpdate
    }).done(function () {
      loadEvent();
      $voteForm.addClass('locked');
      $(this).hide();
      $('#cancel_edit').hide();
      $('#edit_avail').show();
    });
  }

//=============================================================/
// BUTTON EVENTS //
//=============================================================/

  //Upon form submit (pressing the 'confirm avail' button), trigger POST;
  $submitVote.on('click', function () {
    console.log('here')
    if(!$('#guestName').val() && dateArray.length === 0) {
      return alert('Please provide your availability!');
    } else if (!$('#guestName').val()) {
      return alert('Please let us know who you are!');
    } else if (dateArray.length ===0) {
      return alert('Please pick a day (or more)!');
    } else {
      event.preventDefault();
      submitVotes();
    }
  });

  //Upon clicking 'edit', open field for editing, with cancel and confirm options:

  $('#edit_avail').on('click', function() {
    //unlocks field for editing:
    $voteForm.removeClass('locked');
    //hides edit button, reveals confirm and cancel buttons:
    $(this).hide();
    $('#cancel_edit').show();
    $('#confirm_changes').show();
  });

  //Upon clicking 'cancel', discard the changes, render the previous page state without reloading
  $('#cancel_edit').on('click', function() {
    returnPrevious();
  });

  //Upon clicking 'confirm changes', the data should OVERWRITE the old selections
  $('#confirm_changes').on('click', function() {
    updateVotes();
  });

/* ======================================================== */
//IF EVENT CREATOR//
/* ======================================================== */

  // if(eventcreatorcookie) {
  //   //Edit event button should appear
  //   $('#edit_event').show();
  //   //If event creator, upon clicking 'edit event', creator should
  //   //be able to unlock the fields for selecting/unselecting
  //   $('#edit_event').on('click', function() {
  //     //unlocks field for editing:
  //     $voteForm.removeClass('locked');
  //     //hides edit button, reveals confirm and cancel buttons:
  //     $(this).hide();
  //     $('#cancel_edit').show();
  //     $('#confirm_event_changes').show();
  //   });
  // };

  // //Upon clicking 'confirm event changes' AS ORGANIZER, should
  // //instead update the EVENT dates with a PUT request
  // $('#confirm_event_changes').on('click', function() {
  //   updateEvent();
  // });

});











