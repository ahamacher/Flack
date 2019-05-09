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
      body: "",
      active: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.bottom = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
  }

  componentDidMount() {
    this.props.fetchMessages();
    this.bottom.current.scrollIntoView();
  }

  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleClick, false);
  }

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
          // remove this for production, displays a sucessful connection
          console.log("connected to channel!!!");
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
        },
        speak: function (payload) {
          this.perform("speak", payload);
        }
      }
    );
  }

  handleClick(e) {
    if (this.pop.contains(e.target)) {
      return;
    }
    this.toggleClass();
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
    if (body.length > 0) {
      createMessage(message);
      this.setState({ body: "" });
    }
  }

  handleEnter(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      if (this.state.body !== 0) {
        this.handleSubmit(e);
      }
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

  toggleClass() {
    const currentState = this.state.active;
    if (currentState) {
      document.removeEventListener("mouseup", this.handleClick, false);
    } else {
      document.addEventListener("mouseup", this.handleClick, false);
    }
    this.setState({ active: !currentState });
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
            <div className="icon">
              <i id="phone" className="fas fa-phone" />
              <span className="tooltip-text tooltip">Calls disabled</span>
            </div>{" "}
            <div className="icon hover-blue">
              <i className="fas fa-info" />
              <span className="tooltip-text tooltip">Show Channel Details</span>
            </div>{" "}
            <div className="icon hover-blue" onClick={this.toggleClass}>
              <i className="fas fa-cog" />
              <div
                className={this.state.active ? "active-cog" : "hidden"}
                ref={node => (this.pop = node)}
              >
                <ul>
                  <li className="menu-link">View channel Details</li>
                  <li className="menu-link">Additional options...</li>
                  <li className="divider" />
                  <li className="menu-link">leave #messages-channel</li>
                </ul>
              </div>
              <span
                className={
                  this.state.active ? "hidden" : "tooltip-text tooltip"
                }
              >
                Channel Settings
              </span>
            </div>{" "}
            <div className="head-search" />{" "}
            <div className="icon hover-red">
              <i className="fas fa-at" />
              <span className="tooltip-text tooltip">Show Activity</span>
            </div>{" "}
            <div className="icon hover-yellow">
              <i className="far fa-star" />
              <span className="star-tooltip tooltip">Show Starred Items</span>
            </div>{" "}
            <div className="icon hover-blue">
              <i className="fas fa-ellipsis-v" />
              <span className="more-tooltip tooltip">More Items</span>
            </div>
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
          <h5>{currentUser.userName}</h5>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="dropdown">{currentUser.userName}</div>
        <div>
          <h4>All threads</h4>
        </div>

        <div className="channel-list">
          Channels <button type="button" className="side-bar-add"> + </button>
          <ul>
            
          </ul>
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
              onKeyDown={e => this.handleEnter(e)}
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
        <div id="message-window">
          <ul className="message-list">
            <li className="list-padding">
              <h4>This is the very beginning of the{" "}
                <span className="bold"># messages-channel</span> channel</h4>
            </li>
            {this.messageList()}
            <div ref={this.bottom} />
          </ul>
          {this.messageForm()}
        </div>
      </div>
    );
  }
}

export default Channel;
