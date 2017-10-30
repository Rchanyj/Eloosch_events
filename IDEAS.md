#User interactions
**Create a miniature, simple version to test basic desired functions**

##All users
- The calendar should have a view where it automatically places the current date as the first row it displays (so there are no cases where the user sees a bunch of past dates).

##Event organizer (home/create event page) / event creation
- I should see a calendar (with any other of my event dates highlighted)
- Upon clicking on any date, that date box will be highlighted, AND an event creator box will fade in / activate at the bottom right corner *[stretch?]***
  - If I click on that date again, it will be unselected (and unhighlighted)
  - Will have a form field for 'Event name', 'Organizer name', and 'Email' (optional).
  - Below these text areas, a 'Create Event' button that will create the event
- I'd be able to select ANY combination of dates before clicking 'Create Event', which will be logged as the dates encompassing my event
- Upon event creation, I will be given a special URL (it should pop up) that I can copy and paste to send to others. (This can happen on the homepage or be on the event page I'm redirected to).
  - Special URL should appear in a field on both pages, with a 'copy' button so users can link it
- After event creation, I can no longer click on the dates
- An edit button and a 'Create another event' button will replace the 'Create Event' button
- Upon clicking the 'edit' button, the fields will be selectable again, and the 'edit' button will be replaced by a 'confirm changes' and a 'cancel' button
  - Clicking the 'cancel' button will cancel all changes and 'lock' all the dates again
- Once the changes are confirmed, I again can no longer select the dates, and the 'edit' button reappears

##Guest (event page)
- I should see a calendar with the dates of the event (set by the organizer) slightly highlighted; other days are greyed out and cannot be clicked
- The availabilities of other guests (if provided) should also appear
- Upon clicking on ANY of the available dates, a 'Confirm Availability' button should fade in to the right
- Upon clicking on a date, that date box will become highlighted (and if I click on it again, it will be unselected, and the highlighting will disappear)
- I can click on the 'Confirm Availability' button, and receive a confirmation message
- The message should disappear (either by itself or if I click a button on it)
- Once this is all done, the date fields become 'locked' and I can no longer select (highlight) them
- An 'edit' button will replace the confirmation button
- Upon clicking on this 'edit' button, I can then edit my selections
  - The 'edit' button will be replaced by a 'confirm' and 'cancel' button, that work the same way as the respective buttons in the organizer's edit mode

##Main issue to address: editing as the organizer. The highlighting of the event dates must be different than the guest selections, and upon de-selecting any date(s), the guest entries should disappear as well. 

##**How to go about implementing this:
  1. Discuss how to change and control the 'states' of the calendar (interactive, non-interactive)
    I. Figure out a way to 'lock' the calendar from responding to any more click events until the 'edit' buttons are clicked (but this can be toggled so that they can be interactive again)
    II. Toggle a completely different calender html that's not interactive?
  2. Implement all the functions, returning what you wish to transfer to the database (this is how these functions will be connected to the database later)
  **
