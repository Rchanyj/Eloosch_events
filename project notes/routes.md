ROUTES

GET '/' - landing page
POST '/event' - Create new event, redirect to '/event/:id/
   body: event_name, user_name, **email
GET '/event/:id' - Event voting page
POST '/event/:id' - Create Vote   
PUT '/event/:id' - Edit vote
DELETE '/event/:id' - Delete event

