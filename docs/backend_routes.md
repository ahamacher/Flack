## HTML
* `GET` `StaticPagesController#root`
## API Endpoints
### `users`
* `GET` `/api/users` -  Returns the individual user information, will be used for channel user lists
* `POST` `/api/users` - User sign up
### `session`
* `POST` `/api/session` - Session/ user login
* `DELETE` `/api/session` - Log out
### `channels`
* `GET` `/api/channels/:id` - List of all Channels in the workspace
* `POST` `/api/channels` - Create a new channel
* `DELETE` `/api/channel/:id` - Delete a channel
### `messages` 
* `GET` `/api/channels/id/messages` - List of all messages, filter by channel
* `POST` `/api/messages` - Create a new message
* `PATCH`  `/api/message/:id` - Edit a message
* `DELETE` `/api/message/:id` - Delete message