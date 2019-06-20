/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable default-case */
import React from "react";
import ActionCable from "actioncable";
import MessageItemContainer from "../message/message_item_container";
import ChannelItemContainer from "./channel_item_container";
import NewChannelFormContainer from "./new_channel_form_container";

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      active: false,
      userModal: false,
      channelModal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.bottom = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.channelConnection = this.channelConnection.bind(this);
    this.channelList = this.channelList.bind(this);
    this.toggelChannelMod = this.toggelChannelMod.bind(this);
  }

  componentDidMount() {
    this.props.fetchChannels();
    this.channelConnection(1);
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
    const parent_id = 0;
    const { currentChannel } = this.props;
    const message = { body, parent_id, channel_id: currentChannel };
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
    const { activeChannel } = this.props;
    const userCt = Object.keys(users).length;

    return (
      <header className="channel-header">
        <div className="head-left">
          <div className="channel-name">
            <h2># {activeChannel.name}</h2>
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

  channelList() {
    return this.props.channels.map(channel => {
      return (
        <li
          onClick={() => this.channelConnection(channel.id)}
          key={channel.id}
          className="channel-list-item"
        >
          <ChannelItemContainer channel={channel} />
        </li>
      );
    });
  }

  toggleUserModal() {
    const currentState = this.state.userModal;
    this.setState({ userModal: !currentState });
  }

  sidebarUserModal() {
    const { currentUser, logout } = this.props;
    return (
      <div
        className="user-modal-container"
        onClick={() => this.toggleUserModal()}
      >
        <div className="user-modal-header">
          <div className="modal-user-img">
            <img
              src="https://s3-us-west-1.amazonaws.com/flack-app/img/nophoto.png"
              alt=""
            />
          </div>
          {currentUser.username}
        </div>
        <ul className="user-modal">
          <li className="user-list-item">
            <button type="button" onClick={logout}>
              Sign out of Flack?
            </button>
          </li>
        </ul>
      </div>
    );
  }

  newChannelMod() {
    const { channelModal } = this.state;
    return channelModal ? (
      <NewChannelFormContainer
        toggle={this.toggelChannelMod}
        channelConnection={this.channelConnection}
      />
    ) : null;
  }

  toggelChannelMod() {
    const { channelModal } = this.state;
    this.setState({ channelModal: !channelModal });
  }

  channelSideBar() {
    const { currentUser, activeChannel } = this.props;
    const { userModal } = this.state;
    const title =
      activeChannel.name.charAt(0).toUpperCase() + activeChannel.name.slice(1);
    return (
      <aside className="channel-list-container">
        <div className="channel-button" onClick={() => this.toggleUserModal()}>
          <h1>{title} ⌄</h1>
          <h5 className="current-user">
            <span className="activity-icon">●</span> {currentUser.username}
          </h5>
          <div className={userModal ? "user-modal-back" : "hidden"}>
            {this.sidebarUserModal()}
          </div>
        </div>
        <div className="padding-12" />
        <div className="thread-head-wrapper">
          <div id="thread-headder">
            <i className="far fa-comments" /> All threads
          </div>
        </div>
        <div className="padding-18" />
        <ul className="channel-list">
          <li className="channel-list-head">
            <span>Channels</span>
            <button
              type="button"
              className="side-bar-add"
              onClick={() => this.toggelChannelMod()}
            >
              <i className="fas fa-plus-circle" />
            </button>
          </li>
          {this.channelList()}
        </ul>
      </aside>
    );
  }

  messageForm() {
    const { activeChannel } = this.props;
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
              placeholder={`Message #${activeChannel.name}`}
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
    const { activeChannel } = this.props;
    return (
      <div className="channel-container">
        {this.newChannelMod()}
        {this.channelSideBar()}
        {this.channelHead()}
        <div id="message-window">
          <ul className="message-list">
            <li className="list-padding">
              <h4>
                This is the very beginning of the{" "}
                <span className="bold"># {activeChannel.name}</span> channel
              </h4>
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
