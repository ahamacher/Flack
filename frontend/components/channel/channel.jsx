import React from "react";

const Channel = props => {
  const { currentUser, logout } = props;
  const greeting = () => {
    return (
      <div>
        <h5>Welcome {currentUser.email}</h5>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };
  const oops = () => {
    return (
      <div>
        <h1>what? something happened!</h1>
      </div>
    );
  };
  return currentUser ? greeting() : oops();
};

export default Channel;
