$(document).ready(function () {
  $('#calendar').fullCalendar()

  const $lockButton   = $('.togglelock')
  const $submit       = $('#create-event-button')
  const $form         = $('#event-build-form form')
  let datesArray      = []

  function postEvent () {
    debugger
    const queryStr = createQueryString()
    $.ajax({
      url: '/events',
      method: 'POST',
      data: queryStr
    }).done( ids => {
      localStorage.userId = ids.creatorId
      $.ajax({
        url: `/events/${ids.newEventId}`,
        method: 'GET'
      })
    })
  }

  function createQueryString () {
    const $email = $('#email-input')
    if (!$email.val()) {
      $email.val('null')
    }
    let data = $form.serialize();
    console.log("<--------- " + data);
    for (var i = 1; i < datesArray.length + 1; i++) {
      data = data + `&date${i}=${datesArray[i - 1]}`
    }
    console.log(localStorage.userId);
    data += `&creatorId=${localStorage.userId}`
    return data
  }

  function addSelectedClass () {
    const $allDays = $('#calendar').find('.fc-day')
    $.each($allDays, function(index, value) {
      if (datesArray.includes($(value).data('date'))) {
        $(value).addClass('selected')
      }
    })
  }

  function calRefresh (event) {
    console.log('here')
    const dateClicked = $(this).attr('data-date')
    const isDay = $(this).hasClass('fc-day')
    console.log(isDay)
    if (datesArray.includes(dateClicked) && isDay) {
      $(this).removeClass('selected')
      datesArray = datesArray.filter(a => a !== dateClicked)
    } else if (isDay) {
      datesArray.push(dateClicked)
      $(this).addClass('selected')
    } else {
      addSelectedClass()
    }
  }

  $submit.on('click', postEvent)

  $('#calendar').on('click', '.fc-day', calRefresh)
  $('.fc-button-group').on('click', calRefresh)

  $lockButton.on('click', function () {
    $(this).toggleClass('locked')
  })

})

