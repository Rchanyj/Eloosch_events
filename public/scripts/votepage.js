$(document).ready(function() {

  const $submit = $('#confirm_avail');
  const $form = $('#confirm_avail_form');
  let datesArray = [];

  /* Vote ajax submission object format */
  const votes = {
      name: "someName2",
      days: {
          "2017-11-01" : false,
          "2017-11-02" : false
        },
      hash: "8Q4ggFAphR6HbkPi",
      email: "address",
      }

  // ===========================================

  function postEvent() {
    const queryStr = createQueryString();
    console.log(queryStr);
    $.ajax({
      url: '/events',
      method: 'POST',
      data: queryStr
    }).done(function(arg){
      //lock fields
      $form.addClass('locked');
      //Confirm button disappears:
      $submit.hide();
      //Edit button appears
      $('#edit_avail').show();
      console.log(arg);
    });
  }

  function createQueryString() {
    const $email = $('#email-input');
    if (!$email.val()) {
      $email.val('null');
    }
    let data = $form.serialize();
    for (var i = 1; i < datesArray.length + 1; i++) {
      data = data + `&date${i}=${datesArray[i-1]}`;
    }
    return data;
  }

  //discards selected fields, re-renders the previous state of the page

  function returnPrevious() {
    $.ajax({
      url: '/events/:id',
      method: 'GET',
    }).done(function() {
      //locks fields again
      $form.addClass('locked');
      $(this).hide();
      $('#confirm_changes').hide();
      $('#edit_avail').show();
    });
  }

  //Submits a PUT request that OVERWRITES old entries for that particular user/date

  function updateEvent() {
    const queryStr = createQueryString();
    $ajax({
      url: '/events/:id',
      method: 'PUT',
      data: queryStr
    }).done(function () {
      $form.addClass('locked');
      $(this).hide();
      $('#cancel_edit').hide();
      $('#edit_avail').show();
    });
  }

/* BUTTON EVENTS ==============================================
  //Upon form submit (pressing the 'confirm avail' button), trigger POST;
  $submit.on('click', function () {
    event.preventDefault();
    postEvent();
  });

  //Upon clicking 'edit', open field for editing, with cancel and confirm options:

  $('#edit_avail').on('click', function() {
    //unlocks field for editing:
    $form.removeClass('locked');
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
    updateEvent();
  });
*/
/* ========================================================= */

/* STATE TESTS ==================================================== */
              //TEST: removing hidden attrib:
            $('#fakeconfirm').on('click', function() {
              //simulate locking fields after submit event:
              $form.addClass('locked');
              //simulate hiding confirm button:
              $('#fakeconfirm').hide();
              //reveal edit button:
              $('#edit_avail').show();
            })

            //TEST2: upon clicking 'edit':
            $('#edit_avail').on('click', function() {
              //unlocks field for editing:
              $form.removeClass('locked');
              //hides edit button, reveals confirm and cancel buttons:
              $(this).hide();
              $('#cancel_edit').show();
              $('#confirm_changes').show();
            });

            //TEST2: CANCEL CHANGES (DISCARD CHANGES? locks fields again)
            //Cancel/confirm buttons should disappear; edit button reappears
              //Ajax should allow the previously confirmed fields to render without reloading the page
            $('#cancel_edit').on('click', function() {
              $form.addClass('locked');
              $(this).hide();
              $('#confirm_changes').hide();
              $('#edit_avail').show();
            });
            //TEST3: CONFIRM CHANGES
              //Ajax should allow the changes to render without reloading the page;
            $('#confirm_changes').on('click', function() {
              $form.addClass('locked');
              $(this).hide();
              $('#cancel_edit').hide();
              $('#edit_avail').show();
            });
/* ==================================================== */

  $('#calendar').fullCalendar({

      dayClick: function(date, jsEvent, view) {
      // toggle day color with clicks (by adding a new class to the clicked element)
      if (!$form.hasClass('locked')) {
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

  })

/* test rendering selection on specified date blocks */
  const eventobj = {
    title: 'personname',
    allDay: true,
    start: '2017-10-10',
    eventOrder: 'title'
  }

  const eventobj2 = {
    title: 'billaybob',
    allDay: true,
    start: '2017-10-10',
    eventOrder: 'title'
    }

  $('#calendar').fullCalendar('renderEvent', eventobj, true);
  $('#calendar').fullCalendar('renderEvent', eventobj, true);
  $('#calendar').fullCalendar('renderEvent', eventobj, true);
  $('#calendar').fullCalendar('renderEvent', eventobj, true);
  $('#calendar').fullCalendar('renderEvent', eventobj2, true);
  $('#calendar').fullCalendar('renderEvent', eventobj, true);
  $('#calendar').fullCalendar('renderEvent', eventobj, true);
  $('#calendar').fullCalendar('renderEvent', eventobj, true);
  $('#calendar').fullCalendar('renderEvent', eventobj, true);
  //use renderEvents?

  //Test limiting selecting range to ONLY that of the organizer's set dates:


});











