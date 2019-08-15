import React from "react";

class NewDmForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      subtitle: "",
      defaultChan: false
    };
    this.update = this.update.bind(this);
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(form) {
    return e => this.setState({ [form]: e.currentTarget.value });
  }

  close() {
    const { closeModal } = this.props;

    this.setState({ name: "", subtitle: "", defaultChan: false });
    closeModal();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, subtitle, defaultChan } = this.state;
    const values = {
      name,
      subtitle,
      is_dm: true,
      default: defaultChan
    };
    const { createChannel } = this.props;
    createChannel(values);
  }

  userList() {
    
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
          <h1 className="form-headder">Direct Message</h1>
          <input
            type="text"
            className="text-input"
            onChange={this.update("name")}
            value={name}
            placeholder="Find or start a conversation"
          />
        </form>
      </div>
    );
  }
}

export default NewDmForm;
