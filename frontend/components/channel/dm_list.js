import React, { Component } from 'react';
import { fetchChannels } from "../../actions/channel_actions";
import DmListItem from "./dm_list_item";

class DmList extends Component {
  constructor(props){
    super(props);

    this.dmChannels = [];
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    fetchChannels();
    this.filter();
  }

  componentDidUpdate() {
    this.filter();
  }

  filter() {
    const { channels } = this.props;
    if (channels) {
      channels.forEach(channel => {
        if (channel.isDM) {
          this.dmChannels.push(channel);
        }
      });
    }
  }

  dmListItem(){
    return this.dmChannels.map(channel => {
      return (
        <li
          onClick={() => this.channelConnection(channel.id)}
          key={channel.id}
          className="channel-list-item"
        >
          <DmListItem channel={channel} />
        </li>
      );
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
