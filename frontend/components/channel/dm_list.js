import React, { Component } from 'react';
import { fetchChannels } from "../../actions/channel_actions";
import DmListItem from "./dm_list_item";

class DmList extends Component {
  componentDidMount() {
    fetchChannels();
  }

  dmListItem() {
    const { channelConnection, channels } = this.props;
    return channels.map(channel => {
      if (channel.is_dm) {
        return (
          <li
            onClick={() => channelConnection(channel.id)}
            key={channel.id}
            className="channel-list-item"
          >
            <DmListItem channel={channel} />
          </li>
        );
      }
    });
  }

  render() {
    const { DmModal } = this.props;
    return (
      <ul className="channel-list">
        <li className="channel-list-head dm-list">
          <span>Direct Messages</span>
          <button
            type="button"
            className="side-bar-add"
            onClick={() => DmModal()}
          >
            <i className="fas fa-plus-circle" />
          </button>
        </li>
        {this.dmListItem()}
      </ul>
    );
  }
}

export default DmList;
