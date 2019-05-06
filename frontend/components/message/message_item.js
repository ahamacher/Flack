import React from "react";

const MessageItem = ({ message, users }) => {
  // debugger;

  return (
    <li>
      {users[message.author_id].username}
      <br/>
      {message.body}
    </li>
  );
};

export default MessageItem;
