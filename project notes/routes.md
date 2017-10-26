ROUTES

GET '/' - landing page
POST '/events' - Create new event, redirect to '/events/:id/
PUT '/events/:event_id' - Edit event 
GET '/events/:event_id' - Event voting page
DELETE '/events/:event_id' - Delete event

VOTES

POST '/events/:event_id/votes' - Create vote
PUT '/events/:event_id/votes' - Edit vote

