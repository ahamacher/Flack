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
    const { closeModal } = this.props;

    this.setState({ name: "", subtitle: "", defaultChan: true });
    closeModal();
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
    const { createChannel } = this.props;
    createChannel(values);
  }

  renderErrors() {
    if (this.props.errors.responseJSON) {
      return (
        <ul className="errors">
          {this.props.errors.responseJSON.map((error, i) => (
            <li key={`error-${i}`} className="error">
              {error}
            </li>
          ))}
        </ul>
      );
    }
    return <div className="errors" />;
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
          <h1 className="form-headder">Create a channel</h1>
          <p>
            Channels are where your members communicate. They’re best when
            organized around a topic — #marketing, for example.
          </p>
          <section className="form-option">
            <div className="form-input-title">Name</div>

            {defaultChan ? (
              <div className="channel-hash">#</div> ) : (
              <i className="fas fa-lock channel-hash" id="lock"></i> 
            )}
            <input
              type="text"
              value={name}
              onChange={this.update("name")}
              className="text-input"
              placeholder="e.g. marketing"
            />
            <div className="form-input-subtitle">
              Names must be lowercase, without spaces or periods and shorter
              than 22 characters.
            </div>
          </section>
          <section className="form-option">
            <div className="form-input-title">
              Purpose <span>(optional)</span>
            </div>
            <input
              type="text"
              value={subtitle}
              onChange={this.update("subtitle")}
              className="text-input"
            />
            <div className="form-input-subtitle">
              What’s this channel about?
            </div>
          </section>
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
          <button type="button" onClick={this.close}>
            Cancel
          </button>
          <button type="button" onClick={this.handleSubmit}>
            Create Channel
          </button>
        </div>
        {this.renderErrors()}
      </div>
    );
  }
}

export default NewChannelForm;
