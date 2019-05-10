import React from "react";

const ChannelItem = (props) => {
  let selected = false;
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

export default ChannelItem;
