/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
    this.createDM = this.createDM.bind(this);
    this.existing = false;
    this.existingChan = {};
    this.filteredUsers = [];
    this.userList = this.userList.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
    this.filterUsers();
  }

  update(form) {
    return e => {
      this.filterUsers(e.currentTarget.value);
      this.setState({ [form]: e.currentTarget.value });
    };
  }

  close() {
    const { closeModal } = this.props;

    this.setState({ name: "", subtitle: "", defaultChan: false });
    closeModal();
  }

  createDM(id) {
    const { subtitle, defaultChan } = this.state;
    const {
      currentUser,
      createChannel,
      channels,
      channelConnection
    } = this.props;

    let channelName = currentUser + "+" + id;
    const channelList = Object.keys(channels);

    function compare(arr1, arr2) {
      if (arr1 === arr2) return true;
      if (arr1 == null || arr2 == null) return false;
      if (arr1.length !== arr2.length) return false;

      arr1.sort();
      arr2.sort();
      for (let i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    }

    for (let i = 0; i < channelList.length; i++) {
      const element = channelList[i];
      if (compare(channels[element].ids, [id, currentUser])) {
        this.existing = true;
        this.existingChan = Object.assign(channels[element]);
      }
    }

    const values = {
      name: channelName,
      subtitle,
      is_dm: true,
      default: defaultChan,
      dm_receiver: id
    };
    if (this.existing) {
      this.close();
      channelConnection(this.existingChan.id);
    } else {
      createChannel(values);
    }
  }

  filterUsers(input = "") {
    const { users } = this.props;
    const filtered = [];
    if (users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.username.toUpperCase().indexOf(input.toUpperCase()) > -1){
          filtered.push(user);
        }
      }
    }
    this.filteredUsers = filtered;
  }

  userList() {
    const { currentUser } = this.props;
    return this.filteredUsers.map(user => {
      if (currentUser != user.id) {
        return (
          <li
            key={user.id}
            className="user-list-item"
            onClick={() => this.createDM(user.id)}
          >
            <img
              src="https://s3-us-west-1.amazonaws.com/flack-app/img/nophoto.png"
              alt=""
              className="post-user-img"
            />
            <p className="username">{user.username}</p>
          </li>
        );
      }
    });
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
          <section className="user-list disable-scrollbars">
            <h5 className="user-list-head">User list</h5>
            <ul>{this.userList()}</ul>
          </section>
        </form>
      </div>
    );
  }
}

export default NewDmForm;
