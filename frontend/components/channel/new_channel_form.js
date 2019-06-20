import React from "react";

class NewChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      subtitle: "",
      defaultChan: true
    };
    this.update = this.update.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(form) {
    return e => this.setState({ [form]: e.currentTarget.value });
  }

  toggle() {
    const { defaultChan } = this.state;
    return () => this.setState({ defaultChan: !defaultChan });
  }

  close() {
    const { modToggle } = this.props;

    this.setState({ name: "", subtitle: "", defaultChan: true });
    modToggle();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, subtitle, defaultChan } = this.state;
    const values = {
      name,
      subtitle,
      is_dm: false,
      default: defaultChan
    };
    const { createChannel, channelConnection } = this.props;
    createChannel(values);
    this.close();
  }

  render() {
    const { name, subtitle, defaultChan } = this.state;
    return (
      <div className="new-channel-mod">
        <div id="close-new-chan-mod" onClick={this.close}>
          <div className="close-big">X</div>
          <div className="close-sub">esc</div>
        </div>
        <form className="new-chan-form">
          <label className="form-title">Name
            <input type="text" value={name} onChange={this.update("name")} />
          </label>
          <div className="form-subtitle">
            Names must be lowercase, without spaces or periods and shorter than
            22 characters.
          </div>
          <label className="form-title">Purpose <span>(optional)</span>
            <input type="text" value={subtitle} onChange={this.update("subtitle")}/>
          </label>
          <input
            type="checkbox"
            name="privacy"
            id="privacy"
            checked={defaultChan}
            onChange={this.toggle()}
          />
          {defaultChan ? (
            <div id="public-option">Anyone can join your channel.</div>
          ) : (
            <div id="private-option">
              This channel can only be viewed or joined by invite.
            </div>
          )}
          {/* <div id="public-option">Anyone can join your channel.</div>
          <div id="private-option">
            This channel can only be viewed or joined by invite.
          </div> */}
        </form>
        <div className="channel-form-buttons">
          <button type="button" onClick={this.close}>Cancel</button>
          <button type="button" onClick={this.handleSubmit}>Create Channel</button>
        </div>
      </div>
    );
  }
}

export default NewChannelForm;
