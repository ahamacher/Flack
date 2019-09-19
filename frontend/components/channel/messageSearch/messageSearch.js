/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";

class MessageSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      filteredMessages: [],
    };
    this.close = this.close.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.update = this.update.bind(this);
    this.joinChannel = this.joinChannel.bind(this);
    this.messageList = this.messageList.bind(this);
  }

  update(form) {
    return e => {
      this.setState({ [form]: e.currentTarget.value });
    };
  }

  handleEnter(e) {
    const { query } = this.state;
    const { fetchMessages } = this.props;
    if (e.which === 13) {
      e.preventDefault();
      if (query.length > 0) {
        fetchMessages({ input: query });
        this.setState({ query: "" });
      }
    }
  }

  close() {
    const { closeModal } = this.props;

    this.setState({
      query: "",
      filteredMessages: [],
    });
    closeModal();
  }

  joinChannel(id) {
    const {
      channelConnection,
      joinChannel,
      channels,
      currentUser,
    } = this.props;
    const userIds = channels[id].ids;
    if (userIds.includes(currentUser)) {
      channelConnection(id);
    } else {
      joinChannel(id);
      channelConnection(id);
    }
    this.close();
  }

  userImage() {
    return (
      <div className="post-user-img">
        <img
          src="https://s3-us-west-1.amazonaws.com/flack-app/img/nophoto.png"
          alt=""
        />
      </div>
    );
  }

  messageList() {
    const { messages, users } = this.props;
    return messages.map(message => {
      let username = "";
      if (users[message.author_id]) {
        username = users[message.author_id].username;
      }
      return (
        <li key={message.id} className="post-list">
          {this.userImage()}
          <div className="post-content">
            <div className="post-user">
              {username}
              <span> {message.timestamp}</span>
            </div>
            <div className="message-body">{message.body}</div>
          </div>
        </li>
      )
    });
  }

  render() {
    const { query } = this.state;
    return (
      <div className="new-channel-mod">
        <div id="close-new-chan-mod" onClick={this.close}>
          <div className="close-big">X</div>
          <div className="close-sub">esc</div>
        </div>
        <form className="new-chan-form">
          <h1 className="form-headder">Search through messages</h1>
          <input
            type="text"
            className="text-input"
            onChange={this.update("query")}
            value={query}
            onKeyPress={e => this.handleEnter(e)}
            placeholder="Search for a term"
          />
          <section className="user-list disable-scrollbars">
            <h5 className="user-list-head">Search Results</h5>
            <ul className="modal-list disable-scrollbars">
              {this.messageList()}
            </ul>
          </section>
        </form>
      </div>
    );
  }
}

export default MessageSearch;
