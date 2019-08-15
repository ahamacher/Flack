import { connect } from "react-redux";
import React from "react";

const DmItem = (props) => {
  let selected = false;
  const { channel } = props;
  if (props.currentChannel === props.channel.id) {
    selected = true;
  }
  return (
    <div
      className={selected ? "channel-selected" : "item"}
    >
      {"# "}
      {props.channel.name}
    </div>
  );
};

const mapStateToProps = ({ session }, ownProps) => {
  return {
    currentChannel: session.channelId,
    channel: ownProps.channel
  };
};

export default connect(
  mapStateToProps,
  null
)(DmItem);
