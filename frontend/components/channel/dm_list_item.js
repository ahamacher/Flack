import { connect } from "react-redux";
import React from "react";

const DmItem = (props) => {
  let selected = false;
  const { channel } = props;
  if (props.currentChannel === props.channel.id) {
    selected = true;
  }
  let dmName = "";
  if (channel.ids && channel.is_dm) {
    channel.ids.forEach(id => {
      if (id !== props.currentUser && props.users[id]) {
        dmName += `${props.users[id].username}`;
      }
    });
  }

  return (
    <div
      className={selected ? "channel-selected" : "item"}
    >
      {"# "}
      {dmName}
    </div>
  );
};

const mapStateToProps = ({ session, entities }, ownProps) => {
  return {
    users: entities.users,
    currentUser: session.id,
    currentChannel: session.channelId,
    channel: ownProps.channel
  };
};

export default connect(
  mapStateToProps,
  null
)(DmItem);
