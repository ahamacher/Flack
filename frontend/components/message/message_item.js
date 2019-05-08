import React from "react";

class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { message, users } = this.props;
    const { updateMessage, removeMessage } = this.props;
    return (
      <li className="post-container">
        <div className="post-user-img">
          <img
            src="https://s3-us-west-1.amazonaws.com/flack-app/img/nophoto.png"
            alt=""
          />
        </div>
        <div className="post-content">
          <div className="post-user">
            {users[message.author_id].username}
            <span> {message.timestamp}</span>
          </div>
          <div className="message-body">
            <div><button onClick={() => removeMessage(message.id)}>delete</button></div>
            {message.body}
          </div>
        </div>
      </li>
    );
  }
}

export default MessageItem;
