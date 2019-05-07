import React from "react";

const MessageItem = ({ message, users }) => {
  // debugger;

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
          {message.body}
        </div>
      </div>
    </li>
  );
};

export default MessageItem;
