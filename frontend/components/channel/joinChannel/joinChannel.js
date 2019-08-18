/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";

class JoinChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      filteredChannels: []
    };
    this.update = this.update.bind(this);
    this.close = this.close.bind(this);
    this.joinChannel = this.joinChannel.bind(this);
    this.channelList = this.channelList.bind(this);
    this.filterChannels = this.filterChannels.bind(this);
    this.existing = false;
    this.existingChan = {};
  }

  componentDidMount() {
    this.filterChannels();
  }

  update(form) {
    return e => {
      this.filterChannels(e.currentTarget.value);
      this.setState({ [form]: e.currentTarget.value });
    };
  }

  close() {
    const { closeModal } = this.props;

    this.setState({
      name: "",
      filteredChannels: true
    });
    closeModal();
  }

  joinChannel(id) {
    const {
      channelConnection,
      joinChannel,
      channels,
      currentUser
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

  filterChannels(input = "") {
    const { channels } = this.props;
    const filtered = [];
    const searchedChannels = [];

    const channelsList = Object.keys(channels).map(i => channels[i]);

    for (let j = 0; j < channelsList.length; j++) {
      const channel = channelsList[j];
      if (channel.default === true) {
        filtered.push(channel);
      }
    }

    if (filtered.length > 0) {
      for (let i = 0; i < filtered.length; i++) {
        const channel = filtered[i];
        if (channel.name.toUpperCase().indexOf(input.toUpperCase()) > -1) {
          searchedChannels.push(channel);
        }
      }
    }
    this.setState({ filteredChannels: searchedChannels });
  }

  channelList() {
    const { filteredChannels } = this.state;
    return filteredChannels.map(channel => {
      return (
        <li
          key={channel.id}
          className="user-list-item"
          onClick={() => this.joinChannel(channel.id)}
        >
          <p className="username">{channel.name}</p>
          <span className="channel-subtitle">
            {channel.subtitle ? channel.subtitle : " No description Given"}
          </span>
        </li>
      );
    });
  }

  render() {
    const { name } = this.state;
    return (
      <div className="new-channel-mod">
        <div id="close-new-chan-mod" onClick={this.close}>
          <div className="close-big">X</div>
          <div className="close-sub">esc</div>
        </div>
        <form className="new-chan-form">
          <h1 className="form-headder">Join a channel</h1>
          <input
            type="text"
            className="text-input"
            onChange={this.update("name")}
            value={name}
            placeholder="Type a channel to search"
          />
          <section className="user-list">
            <h5 className="user-list-head">Channel List</h5>
            <ul className="modal-list disable-scrollbars">{this.channelList()}</ul>
          </section>
        </form>
      </div>
    );
  }
}

export default JoinChannelForm;
