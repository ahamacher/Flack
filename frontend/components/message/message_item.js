import React from "react";
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import Linkify from 'linkifyjs/react';

hashtag(linkify);

class MessageItem extends React.Component {
  constructor(props) {
    super(props);

    const { body } = this.props.message;
    this.state = {
      body,
      activeForm: false,
      activeMenu: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
    this.editToggle = this.editToggle.bind(this);
    this.renderBody = this.renderBody.bind(this);
  }

  update(form) {
    return e => {
      this.setState({ [form]: e.target.value });
    };
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    const formState = this.state.activeForm;
    const { updateMessage } = this.props;
    const { body } = this.state;
    const { message } = this.props;

    const newMessage = {
      id: message.id,
      body,
      parent_id: message.parent_id,
      author_id: message.author_id
    };

    updateMessage(newMessage);
    if (formState) {
      this.setState({ activeForm: !formState });
    }
  }

  handleEnter(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      if (this.state.body !== 0) {
        this.handleSubmit(e);
      }
    }
  }

  messageModal() {
    return (
      <div className="message-modal active">
        <div className="message-icon hover-blue">
          <i className="fas fa-user-plus" />
        </div>
        <div className="message-icon hover-blue">
          <i className="far fa-comments" />
        </div>
        <div className="message-icon hover-blue">
          <i className="fas fa-long-arrow-alt-right" />
        </div>
        <div className="message-icon hover-blue">
          <i className="far fa-star" />
        </div>
        <div className="message-icon">
          {this.modalMenu()}
          <button
            type="button"
            onClick={this.menuToggle}
            className="hover-blue"
          >
            <i className="fas fa-ellipsis-h" />
          </button>
        </div>
      </div>
    );
  }

  editToggle() {
    const currentState = this.state.activeForm;
    const modalState = this.state.activeMenu;
    const { message, currentUser } = this.props;

    if (message.author_id === currentUser) {
      this.setState({ activeForm: !currentState });
      this.setState({ body: message.body });
      if (modalState) {
        this.menuToggle();
      }
    }
  }

  menuToggle() {
    const currentState = this.state.activeMenu;
    this.setState({ activeMenu: !currentState });
  }

  modalMenu() {
    const { removeMessage } = this.props;
    const { message } = this.props;
    return (
      <>
        <div
          className={this.state.activeMenu ? " modal-back" : "hidden"}
          onClick={this.menuToggle}
        />
        <div className={this.state.activeMenu ? "modal-menu" : "hidden"}>
          <ul className="message-menu-list">
            <li onClick={() => this.editToggle()} className="menu-link">
              Edit message
            </li>
            <li onClick={() => removeMessage(message.id)} className="menu-link">
              Remove Message
            </li>
          </ul>
        </div>
      </>
    );
  }

  userImage() {
    return (
      <div className="post-user-img">
        <img
          src="https://s3-us-west-1.amazonaws.com/flack-app/img/nophoto.png"
          alt=""
        />
      </div>
    );
  }

  messageDisplay() {
    const { message, users } = this.props;
    const { updateMessage, removeMessage } = this.props;
    const { activeForm } = this.state;

    let username;
    if (users[message.author_id]) {
      username = users[message.author_id].username;
    } else {
      username = message.username;
    }
    return (
      <>
        {this.userImage()}
        <div className={activeForm ? "hidden" : "post-content"}>
          <div className="post-user">
            {username}
            <span> {message.timestamp}</span>
          </div>
          <div className="message-body">
            {this.messageModal()}
            {this.renderBody()}
            {/* <Linkify component="button" properties={{onClick: function onClick() {alert('Success!') }}}>
              {message.body}
            </Linkify> */}
          </div>
        </div>
      </>
    );
  }
  // saving for later - cut
  //            <div>
  //            <button onClick={() => removeMessage(message.id)}>delete</button>
  //          </div >

  editMessageForm() {
    const { activeForm } = this.state;
    return (
      <>
        {this.userImage()}
        <div className={activeForm ? "edit-form-container" : "hidden"}>
          <div className="edit-form-wrapper">
            <form onSubmit={this.handleSubmit} className="edit-form">
              <textarea
                className="autoExpand"
                type="text"
                value={this.state.body}
                onChange={this.update("body")}
                placeholder="Message #message-channel"
                rows="1"
                data-min-rows="1"
                autoFocus
                onKeyDown={e => this.handleEnter(e)}
              />
            </form>
          </div>
            <div className="edit-buttons">
              <button type="button" onClick={() => this.editToggle()} className="edit-form-button">Cancel</button>
              <button type="submit" className="edit-form-button save" onClick={() => this.handleSubmit()}>Save Changes</button>
            </div>
        </div>
      </>
    );
  }

  renderBody() {
    if (this.props.message) {
      const { body } = this.props.message;
      return (
      <Linkify>
        {body}
      </Linkify>
      )
    }
  }

  render() {
    const { activeForm } = this.state;
    return (
      <>
        <li className={activeForm ? "hidden" : "post-container"}>
          {this.messageDisplay()}
        </li>
        <li className={activeForm ? "edit-container" : "hidden"}>
          {this.editMessageForm()}
        </li>
      </>
    );
  }
}

export default MessageItem;
