# Down to Friend
DTF - Down to Friend aims to take the inherently insular idea of modern social networks and turn it on its head. Rather than developing a culture of exclusivity, we seek to create the kind of enviroment that social networks always should've been working toward in the first place - a way for strangers to become not strangers anymore, through intentionally seeking out shared experiences in the real world.

## MVP
***
- Event listings, whose priority relative to the logged in user is grouped based on geographic location, by default specified by the logged in user's preferences
  - This implicitly includes the ability to generate new listings, where a user creates an event or gathering that they want to attend (a movie they want to see, a concert they want to go to, new club they want to visit, etc) and can specify a number of group-specific parameters that the event must meet before it can be closed
    - Minimum and maximum group size (site-wide minimum of 3; this is NOT a dating app)
    - Minimum amount of time before the event date, after which new potential friends are no longer allowed to invite themselves
    - Event location, time, date, specific meetup location
    - Recommended interests to share for those attending (a particular kind of art featured heavily at this particular museum)
    - Optional day trip goals if not implicit to the event (a particular roller coaster you're desparate to ride, landmarks at which you absolutely MUST get a selife)
  - The ability to filter event listings by other criteria, including minimum/maximum group size, common phobias (heights, animals, insects), kinds of outings you'd either love to partake in or would simply rather avoid (*visiting congress uninvited*)

- Joining an event
  - Automatically adds the logged in user to the list of potential attendees (eveyrone is a 'potential' attendee until the listing closes) and navigates to a forum-type discussion centre, where everyone who has joined can engage with the other members and event host to hang out and determine whether they're all Down to Friend
  - A user can choose to disengage and remove themselves from an event listing.
  - An event host can choose to remove another user from an event listing.
  - For groups of 4 or more, non-host members can vote to remove another non-host member, which notifies the host that the other members of the group would like this person removed, but still leaves the decision in the hands of the event creator.
  - You can join events whose time/date occupation overlaps, but if an event closes you will be asked to either withdraw from your other joined events, or withdraw from the closing event. Same day different times, same time different day, acceptble. Same time same day, unacceptable. No hedging your bets.

- Chat. Live. With web sockets. Maybe even with typing notifications.
  - POSSIBLY even group chat but that's a stretch goal


## Schema
***
### Users
|id|email|hashedPassword|firstName|primaryLocale|localeIsPublic|avatarId|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|PK/serial|varchar(255)|bstring|varchar(30)|varchar(25) (coords)|boolean|FK: images(id)|
|unique|unique|not unique|not unique|not unique|not unique|unique|
|not null|not null|not null|not null|not null|not null|null|

### Events
|id|ownerId|dateTime|minGroup|maxGroup|location|description|tags|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|PK/serial|FK: users(id)|dateObj|integer|integer|varchar(25) (coords)|text|enum|
|unique|unique|not unique|not unique|not unique|not unique|not unique|not unique|
|all not null-->|||||||null|

### Event Posts
|id|ownerId|eventId|body|
|:-:|:-:|:-:|:-:|
|PK/serial|FK: users(id)|FK: events(id)|text|
|unique|not unique|not unique|not unique|
|not null|not null|not null|not null|

### Attendees
|userId|eventId|
|:-:|:-:|
|FK: users(id)|FK: events(id)|

### Images
|id|url|
|:-:|:-:|
|PK/serial|text|
|unique|unique|
|not null|not null|

### Event Detail Images
|imageId|eventId|
|:-:|:-:|
|FK: images(id)|FK: events(id)|

### Messages
|id|senderId|recipientId|content|
|:-:|:-:|:-:|:-:|
|PK/serial|FK: users(id)|FK: users(id)|text|
|unique|not unique|not unique|not unique|
|not null|not null|not null|not null|

### Notifications
|messageId|userId|
|:-:|:-:|
|FK: messages(id)|FK: users(id)|

![](https://raw.githubusercontent.com/JType33/down-to-friend/master/dtf-schema.png?token=AQWMWRT6MYQ3ORAAOUYZVD3ADGHT6)

## Planned Routes
***
### Frontend
  - `/`
    - Displays event listings within a set distance of the logged in user's primary locale, or a search locale if one is provided
    - Displays only search results if the visitor is anonymous

  - `/events/:id`
    - will possibly become a modal bc I hate things that disconnect me from my scrolling experience
    - Displays a detail page for a particular event listing, including time/date, description in full, associated images
    - Displays posts the attendees have made within the event listing

  - `/users/:id`
    - Displays a list of events the user has hosted and attended, and, if the user chooses, their general locale

  - `/login`
  - `/signup`

### Backend
  - `POST/api/users`
    - Creates a new user after verifying user information is sufficiently enumerated and correctly fits database schema

  - `GET/api/users/:id`
    - If :id matches loggedIn user:id, display verbose user information data, including email and join date
    - If :id is not the logged in user:id, give user first name

  - `PATCH/api/users/:id`
    - If :id matches loggedIn user:id, update user profile with new information, else do nothing.

  - `POST/api/messages`
    - Create new message
    - Notify recipient

  - `GET/api/messages`
    - Get all messages where sender or recipient = loggedIn user:id

  - `GET/api/messages/:id`
    - Display message content. Destroy if exists notifications(messageId)

  - `POST/api/events`
    - Create new event after verifying event data is sufficiently enumerated

  - `GET/api/events/:id`
    - Retrieve all event details

  - `PATCH/api/events/:id`
    - If loggedIn user:id matches event ownerId, update event with new information

  - `DELETE/api/notifications/:id`
    - If loggedIn user:id matches notification userId, destroy notification in database

  - `DELETE/api/notifications`
    - Destroy all notifications where userId = loggedIn user:id


## Components
***
- Event reel
- Event listing summary
- Message reel
- Message
- Event page post reel
- Event verbose listing
- Event attendee post

## Technologies
***
- Web sockets
- S3 image upload
- Socket.IO
#### STRETCH
- React Native mobile OR electron desktop app connected to the same backend
