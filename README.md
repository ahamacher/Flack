# Flack: A workplace messaging tool

Link to [live site](https://flack-apps.herokuapp.com/)
Flack is a real time web-based messaging application built as a clone of [Slack](https://slack.com/). Flack allows users to communicate over messages organized into multiple channels.

![](https://s3-us-west-1.amazonaws.com/flack-app/img/flack-logo.png)

## Build
* Rails v5.2.3
  * Action Cable / Websockets for messaging
* PostgresQL database
* React / Redux frontend

## Supports Live messaging and interaction
To achieve the live messaging I created an Action Cable subscription to the specific channel. Through this I was able to push updates made to all users. Below is the subscription function from the front end:

```js
  channelConnection(channelId) {
    let cable;
    if (process.env.NODE_ENV !== "production") {
      cable = ActionCable.createConsumer("http://localhost:3000/cable");
    } else {
      cable = ActionCable.createConsumer(
        "WSS://flack-apps.herokuapp.com/cable"
      );
    }
    cable.subscriptions.create(
      { channel: "MessagesChannel", room: channelId },
      {
        connected: () => {
          // console.log("connected to channel!!!");
        },
        received: data => {
          switch (data.type) {
            case "message":
              this.props.receiveMessage({ message: data.message });
              break;
            case "delete":
              this.props.deleteMessage(data.delete);
              break;
          }
        }
      }
    );
    this.props.fetchChannel(channelId);
    this.bottom.current.scrollIntoView();
  }
```
The challenge with this feature was getting the Rails Action Cable connections on the backend to be able to talk with the front end when it creates a connection. To do this I pass the `channelId` fetched from my current users subscribed channels into the `channelConnection` and have a matching backend component that can accept the `channelId` as a room parameter. Doing this allows for a user to switch between active channels on a click.

![](https://s3-us-west-1.amazonaws.com/flack-app/img/CleanDrearyAsianlion.gif)

## Inline Editing
I use a conditional render component to either render the message item or the edit form component. This allows me to have an inline edit form to make changes.

```js
messageDisplay() {
    const { message, users } = this.props;
    const { updateMessage, removeMessage } = this.props;
    const { activeForm } = this.state;

    let username;
    if (users[message.author_id]) {
      username = users[message.author_id].username;
    } else {
      username = message.username;
    }
    return (
      <>
        {this.userImage()}
        <div className={activeForm ? "hidden" : "post-content"}>
          <div className="post-user">
            {username}
            <span> {message.timestamp}</span>
          </div>
          <div className="message-body">
            {this.messageModal()}
            {message.body}
          </div>
        </div>
      </>
    );
  }

 editMessageForm() {
    const { activeForm } = this.state;
    return (
      <>
        {this.userImage()}
        <div className={activeForm ? "edit-form-container" : "hidden"}>
          <div className="edit-form-wrapper">
            <form onSubmit={this.handleSubmit} className="edit-form">
              <textarea
                className="autoExpand"
                type="text"
                value={this.state.body}
                onChange={this.update("body")}
                rows="1"
                data-min-rows="1"
                autoFocus
                onKeyDown={e => this.handleEnter(e)}
              />
            </form>
          </div>
            <div className="edit-buttons">
              <button type="button" onClick={() => this.editToggle()} className="edit-form-button">Cancel</button>
              <button type="submit" className="edit-form-button save" onClick={() => this.handleSubmit()}>Save Changes</button>
            </div>
        </div>
      </>
    );
  }

  render() {
    const { activeForm } = this.state;
    return (
      <>
        <li className={activeForm ? "hidden" : "post-container"}>
          {this.messageDisplay()}
        </li>
        <li className={activeForm ? "edit-container" : "hidden"}>
          {this.editMessageForm()}
        </li>
      </>
    );
  }
}
```
To do this I use React to conditionally assign classes to my components. I store the active state in my React state and can trigger a flip of the form with a click. 

![](https://s3-us-west-1.amazonaws.com/flack-app/img/edits.gif)

## Additional Documents
* [Schema](https://github.com/ahamacher/Flack/wiki/Database-Schema)
* [Sample State](https://github.com/ahamacher/Flack/wiki/Sample-State)
* [MVP List](https://github.com/ahamacher/Flack/wiki/MVP-List)
* [Frontend Routes](https://github.com/ahamacher/Flack/wiki/Frontend-Routes)
* [Backend Routes](https://github.com/ahamacher/Flack/wiki/Backend-Routes)
