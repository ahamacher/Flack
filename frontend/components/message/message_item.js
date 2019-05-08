import React from "react";

class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  messageModal() {
    return (
      <div className="message-modal active">
        <div className="message-icon hover-blue">
          <i className="fas fa-user-plus" />
        </div>
        <div className="message-icon hover-blue">
          <i className="far fa-comments" />
        </div>
        <div className="message-icon hover-blue">
          <i className="fas fa-long-arrow-alt-right" />
        </div>
        <div className="message-icon hover-blue">
          <i className="far fa-star" />
        </div>
        <div className="message-icon menu">
          <i className="fas fa-ellipsis-h" />
        </div>
      </div>
    );
  }

  messageDisplay() {
    const { message, users } = this.props;
    const { updateMessage, removeMessage } = this.props;
    debugger;

    let username;
    if (users[message.author_id]) {
      username = users[message.author_id].username;
    } else {
      username = message.username;
    }
    return (
      <>
        <div className="post-user-img">
          <img
            src="https://s3-us-west-1.amazonaws.com/flack-app/img/nophoto.png"
            alt=""
          />
        </div>
        <div className="post-content">
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
  // saving for later - cut
  //            <div>
  //            <button onClick={() => removeMessage(message.id)}>delete</button>
  //          </div >

  render() {

    return (
      <li className="post-container">
        {this.messageDisplay()}
      </li>
    );
  }
}

export default MessageItem;
