console.log('file loaded')

$(document).ready(function() {
  //Toggle lock interactions test:
  const $lockButton = $('.togglelock')
  const $submit = $('#createEventButton')
  const $form = $('#event-build-form form')
  let datesArray = [];

  function postEvent() {
    const queryStr = createQueryString()
    $.ajax({
      url: '/events',
      method: 'POST',
      data: queryStr
    })
  }

  function createQueryString() {
    const $email = $('#email-input')
    if (!$email.val()) {
      $email.val('null')
    }
    let data = $form.serialize();
    for (var i = 1; i < datesArray.length + 1; i++) {
      data = data + `&date${i}=${datesArray[i-1]}`
    }
    return data;
  }

  $submit.on('click', postEvent)

  $lockButton.on('click', function() {
    $(this).toggleClass('locked');
  });

  $('#calendar').fullCalendar({
      //test functions:
      dayClick: function(date, jsEvent, view) {
      // toggle day color with clicks (by adding a new class to the clicked element)
      if (!$lockButton.hasClass('locked')) {
        const dateClicked = this[0].dataset.date;
        if ($(this).hasClass('selected')) {
          datesArray = datesArray.filter( a => a !== dateClicked )
        } else {
          datesArray.push(dateClicked)
        };
        $(this).toggleClass('selected');
      }
    }
  })
})

