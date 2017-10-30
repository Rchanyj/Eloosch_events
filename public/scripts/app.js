$(document).ready(function () {
const $lockButton   = $('.togglelock')
const $submit       = $('#create-event-button')
const $form         = $('#event-build-form form')
let datesArray      = []
let voteDates       = []

// voting variables
const $submitVote = $('#confirm_avail')
const $voteForm = $('#confirm_avail_form')
const $confirmChanges = $('#confirm_changes')
var dates = {}
const eventId = window.location.pathname;
const domain = 'localhost:8080'

  $('#calendar').fullCalendar({
    dayClick: function(date, jsEvent, view) {
      if (!$voteForm.hasClass('locked')) {
        const dateClicked = this[0].dataset.date;
        console.log(dateClicked);
        if ($(this).hasClass('selected')) {
          voteDates = voteDates.filter( a => a !== dateClicked );
        } else {
          voteDates.push(dateClicked);
        };
        $(this).toggleClass('selected');
      };
    },
    eventLimit: true //displays events without stretching box size
  })

  function postEvent (event) {
    const queryStr = createQueryString()
    $.ajax({
      url: '/events',
      method: 'POST',
      data: queryStr
    })
    .done((res) => {
      localStorage.userId = res.creatorId

      const url = '/events/' + res.newEventId
      window.location.href = url
    })
  }

  function createQueryString () {
    const $email = $('#email-input')
    if (!$email.val()) {
      $email.val('null')
    }
    let data = $form.serialize();
    for (var i = 1; i < datesArray.length + 1; i++) {
      data = data + `&date${i}=${datesArray[i - 1]}`
    }
    data += `&creatorId=${localStorage.userId}`
    return data
  }

  function addSelectedClass (datesArray, className) {
    const $allDays = $('#calendar').find('.fc-day')
    $.each($allDays, function(index, value) {
      if (datesArray.includes($(value).data('date'))) {
        $(value).addClass(className)
      }
    })
  }


  function calRefresh (event) {
    const dateClicked = $(this).attr('data-date')
    const isDay = $(this).hasClass('fc-day')
    if (datesArray.includes(dateClicked) && isDay) {
      $(this).removeClass('selected')
      datesArray = datesArray.filter(a => a !== dateClicked)
    } else if (isDay) {
      datesArray.push(dateClicked)
      $(this).addClass('selected')
    } else {
      addSelectedClass(datesArray, 'selected')
    }
    addSelectedClass(datesArray, 'selected')
  }

  $lockButton.on('click', function () {
    $(this).toggleClass('locked')
  })


  // ---------------------------------------------------

  /*====================================================*/
    // USER / CALENDAR INTERACTIONS //
  /*====================================================*/
    //render event (name, highlights)
    function renderEvent(event) {
      console.log(event);
      for( day of event.event.days ) {
        console.log(day);
        dates[day] = false;
      }
      //select (highlight) dates in db event entry
      window.refreshEventDays()
      // render each guest name and their votes
      for (guest in event.votes) {
        if (event.votes[guest].id === localStorage.userId){
          $voteForm.hide();
          $voteForm.addClass('locked');
          //Confirm button disappears:
          $submitVote.hide();
          //Edit button appears
          $('#edit_avail').show();

        }
        if (guest === 'null'){
          return
        } else {
          for(date in event.votes[guest].days) {
            if(event.votes[guest].days[date] == true) {
              const eventObj = {
              title: event.votes[guest].name,
              allDay: true,
              start: date,
              eventOrder: 'title'
              }
              $('#calendar').fullCalendar('renderEvent', eventObj, true);
            }
          }
        }
      }
    }


    //Fetch event data from db, render event and availabilities on cal-----------------------/
    function loadEvent() {
      $.ajax({
        method: 'GET',
        url: `${eventId}/json`
      }).done(function(event) {
        window.refreshEventDays = function() {
          addSelectedClass(event.event.days, 'event-day')
        }
        renderEvent(event)
      })
    }

    if(window.location.pathname !== '/') {
      loadEvent()
    }

    serialize = function(obj) {
      var str = [];
      for(var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    }

      //Create string of voter data for ajax to submit to db
        //Submit an object of selected dates, with date : true
      function createVotesData(event) {
        let email = $('#email-input').val();
        if (!email) {
          email = null;
        }
        voteDates.forEach(function (date) {
          dates[date] = true;
        });
        console.log(voteDates);
        const name = $('#guestName').val()
        let votes = {
          name,
          days: dates,
          email: email,
          hash: localStorage.userId
        };
        return votes;
      }

      //POST event when user FIRST submits availability: -------------
      function submitVotes() {
        const votesData = createVotesData();
        $.ajax({
          url: `${eventId}/votes`, // need to know event id [URL]
          method: 'POST',
          data: votesData,
          dataType: 'json'
        }).done(function(id){
          console.log(id);
          localStorage.userId = id
          console.log("submited");
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
          $("#calendar").fullCalendar('removeEvents')
          loadEvent();
          voteDates = [];
          //locks fields again
          $voteForm.addClass('locked');
          $(this).hide();
          $('#confirm_changes').hide();
          $('#edit_avail').show();
        };

      //Submit updated availability -----------------------
      //Submits a PUT request that OVERWRITES old entries for that particular user/date
      function updateVotes() {
        const votesData = createVotesData();
        $.ajax({
          url: `${eventId}/votes`,
          method: 'PUT',
          data: votesData
        }).done(function () {
          $('#calendar').fullCalendar('removeEvents')
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

    //=============================================================/
    // BUTTON EVENTS //
    //=============================================================/

      $submit.on('click', function () {
        if(!$('#eventName').val() && datesArray.length === 0) {
            return alert('Please provide a name and date(s)!');
          } else if (!$('#eventName').val()) {
            return alert('Please let us know who you are!');
          } else if (datesArray.length ===0) {
            return alert('Your event needs a day (or more)!');
          } else {
            postEvent();
          }
        })

      $('#calendar').on('click', '.fc-day', calRefresh)
      $('.fc-right').on('click', calRefresh)

      //Upon form submit (pressing the 'confirm avail' button), trigger POST;
      $submitVote.on('click', function () {
        if(!$('#guestName').val() && voteDates.length === 0) {
          return alert('Please provide your availability!');
        } else if (!$('#guestName').val()) {
          return alert('Please let us know who you are!');
        } else if (voteDates.length ===0) {
          return alert('Please pick a day (or more)!');
        } else {
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
        $confirmChanges.show();
      });

      //Upon clicking 'cancel', discard the changes, render the previous page state without reloading
      $('#cancel_edit').on('click', function() {
        returnPrevious();
      });

      //Upon clicking 'confirm changes', the data should OVERWRITE the old selections
      $confirmChanges.on('click', function() {
        $(this).hide();
        updateVotes();
      });

    /* ======================================================== */
    //IF EVENT CREATOR//
    /* ======================================================== */


    // //Updates event dates in db, renders new event dates
    // function updateEvent() {
    //   const eventUpdate = createEventUpdate();
    //   $.ajax({
    //     url: '/:event_id',
    //     method: 'PUT',
    //     data: eventUpdate
    //   }).done(function () {
    //     loadEvent();
    //     $voteForm.addClass('locked');
    //     $(this).hide();
    //     $('#cancel_edit').hide();
    //     $('#edit_avail').show();
    //   });
    // }

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






})

