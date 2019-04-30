### Our components are organized as follows:
* `Root`
  * `App`
    * `MainComponent` 

### the following routes, defined in `App` will render components on the page:
* `/`
  * `splash`
    * `/login`
      * `session_form`
    * `/signup`
      * `session_form`

* `/` redirects to session_form or splash
* if a user is signed in `/` will redirect them to `/channel/default`

### the following routes, defined in `MainComponent` will render components on the page:
  * `/channel/name`
    * `channelFeed`
    * `messageForm`
    * `editMessage`