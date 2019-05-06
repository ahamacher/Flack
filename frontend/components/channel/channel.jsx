/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable default-case */
import React from "react";
import ActionCable from "actioncable";
import MessageItemContainer from "../message/message_item_container";

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      body: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.bottom = React.createRef();
  }

  componentDidMount() {
    // debugger;
    const cable = ActionCable.createConsumer("http://localhost:3000/cable");

    cable.subscriptions.create(
      { channel: "MessagesChannel" },
      {
        connected: () => {
          console.log("connected to channel!!!");
        },
        received: message => {
          this.props.receiveMessage(message);
        },
        speak: function(payload) {
          this.perform("speak", payload);
        }
      }
    );

    // App.cable.subscriptions.create(
    //   { channel: "MessagesChannel" },
    //   {
    //     received: data => {
    //       debugger
    //       switch (data.type) {
    //         case "message":
    //           this.setState({
    //             messages: this.state.messages.concat(data.message)
    //           });
    //           break;
    //         case "messages":
    //           this.setState({ messages: data.messages });
    //           break;
    //       }
    //     },
    //     speak: function(payload) {
    //       return this.perform("speak", payload);
    //     },
    //     load: function() {
    //       return this.perform("load");
    //     }
    //   }
    // );
    // setTimeout(() => App.cable.subscriptions.subscriptions[0].load(), 100);

    this.props.fetchMessages();
  }

  // componentDidUpdate() {

  // }

  update(form) {
    return e => this.setState({ [form]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { body } = this.state;
    const { currentUser, createMessage } = this.props;
    const author_id = currentUser.id;
    const parent_id = 0;

    const message = { body, author_id, parent_id, channel_id: 1 };
    createMessage(message);
    this.setState({ body: "" });
  }

  messageList() {
    return this.props.messages.map((message, idx) => {
      return <MessageItemContainer key={message.id} message={message} />;
    });
  }

  render() {
    const { currentUser, logout } = this.props;
    return (
      <div className="channel-container">
        <div className="temp-greeting">
          <h5>Welcome {currentUser.email}</h5>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="message-list">
          <ul>{this.messageList()}</ul>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.body}
              onChange={this.update("body")}
            />
            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    );
  }
}

export default Channel;
