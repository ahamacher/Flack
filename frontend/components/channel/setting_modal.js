import React from "react";

class SettingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.active;
  }

  render() {
    return (
      <div className={this.state.active ? "active-cog" : "hidden"}>
        <ul>
          <li>View channel Details</li>
          <li>Additional options...</li>
          <li className="divider" />
          <li>leave #{this.props.channelName}</li>
        </ul>
      </div>
    );
  }
}

export default SettingModal;
