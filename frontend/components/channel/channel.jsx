/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable default-case */
import React from "react";
import ActionCable from "actioncable";
import MessageItemContainer from "../message/message_item_container";

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      body: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.bottom = React.createRef();
  }

  componentDidMount() {
    const cable = ActionCable.createConsumer("http://localhost:3000/cable");

    cable.subscriptions.create(
      { channel: "MessagesChannel" },
      {
        connected: () => {
          console.log("connected to channel!!!");
        },
        received: message => {
          this.props.receiveMessage(message);
        },
        speak: function(payload) {
          this.perform("speak", payload);
        }
      }
    );
    this.props.fetchMessages();
    this.bottom.current.scrollIntoView();
  }

  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }

  update(form) {
    return e => this.setState({ [form]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { body } = this.state;
    const { currentUser, createMessage } = this.props;
    const author_id = currentUser.id;
    const parent_id = 0;

    const message = { body, author_id, parent_id, channel_id: 1 };
    createMessage(message);
    this.setState({ body: "" });
  }

  handleEnter(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.handleSubmit(e);
    }
  }

  messageList() {
    return this.props.messages.map((message, idx) => {
      return (
        <MessageItemContainer
          key={message.id}
          message={message}
          className="message-container"
        />
      );
    });
  }

  channelHead() {
    const { users } = this.props;

    const userCt = Object.keys(users).length;

    return (
      <header className="channel-header">
        <div className="head-left">
          <div className="channel-name">
            <h2>#messages-channel</h2>
          </div>
          <div className="channel-subtitle-info">
            <i className="far fa-star" /> | <i className="far fa-user" />{" "}
            {userCt} | <i className="fas fa-thumbtack" /> 0 | channel
            description
          </div>
        </div>
        <div className="head-right">
          <span className="icons">
            <i id="phone" className="fas fa-phone" />{" "}
            <i className="fas fa-info" /> <i className="fas fa-cog" />{" "}
            <div className="head-search" /> <i className="fas fa-at" />{" "}
            <i className="far fa-star" /> <i className="fas fa-ellipsis-v" />
          </span>
        </div>
      </header>
    );
  }

  channelSideBar() {
    const { currentUser, logout } = this.props;
    return (
      <aside className="channel-list-container">
        <div className="temp-greeting">
          <h5>Welcome {currentUser.email}</h5>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="dropdown">{currentUser.userName}</div>
        <div>
          <h4>All threads</h4>
        </div>
      </aside>
    );
  }

  messageForm() {
    return (
      <div className="message-form-container">
        <div className="form-wrapper">
          <span className="message-add">+</span>
          <form onSubmit={this.handleSubmit} className="message-form">
            <textarea
              className="autoExpand"
              type="text"
              value={this.state.body}
              onChange={this.update("body")}
              placeholder="Message #message-channel"
              rows="1"
              data-min-rows="1"
              autoFocus
              onKeyUp={e => this.handleEnter(e)}
            />
          </form>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="channel-container">
        {this.channelSideBar()}
        {this.channelHead()}
        <main id="message-window">
          <ul>
            {this.messageList()}
            <div ref={this.bottom} />
          </ul>
          {this.messageForm()}
        </main>
      </div>
    );
  }
}

export default Channel;
