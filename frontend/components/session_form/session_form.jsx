/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Link } from "react-router-dom";
import Header from "./session_header";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoUser = this.demoUser.bind(this);

    let { email } = this.props;
    if (typeof email === "object") {
      email = "";
    }

    let formStyle;
    if (this.props.match.path === "/login") {
      formStyle = "login";
    } else if (this.props.match.path === "/signup") {
      formStyle = "signup";
    }

    this.state = { email, password: "", formStyle };
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props
      .action({ email, password })
      .then(() => this.props.history.push("/channel"));
  }

  demoUser() {
    debugger;
    this.props
      .action({ email: "test@user.com", password: "password" })
      .then(() => this.props.history.push("/channel"));
  }

  formHead() {
    const { formStyle } = this.state;
    if (formStyle === "login") {
      return <h3 className="form-title">Sign in to your Flack</h3>;
    }
    return <h3 className="form-title">Sign up for Flack</h3>;
  }

  formSubtext() {
    const { formStyle } = this.state;
    if (formStyle === "login") {
      return (
        <span className="formtext">
          Enter your <span className="bold">E-mail address</span> and{" "}
          <span className="bold">password.</span>
        </span>
      );
    }
    return (
      <span className="formtext">
        Enter your <span className="bold">E-mail address</span> and{" "}
        <span className="bold">password.</span>
      </span>
    );
  }

  formFoot() {
    const { formStyle } = this.state;
    const email = "";
    if (formStyle === "login") {
      return (
        <div className="formfoot">
          <div>
            <span className="formtext">Don't have a login? </span>
            <Link
              to={{
                pathname: "/signup",
                state: {
                  email
                }
              }}
            >
              Sign up for one
            </Link>
          </div>
          <button type="button" onClick={this.demoUser}>Demo Flack</button>
        </div>
      );
    }
    return (
      <div>
        <span className="formtext">Already have a login? </span>
        <Link to="/login">Sign in</Link>
      </div>
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="session-page">
        <Header />
        <div className="session-form">
          {this.formHead()}
          {this.formSubtext()}
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.handleChange("email")}
              value={email}
              placeholder="Email address"
            />
            <br />
            <input
              type="password"
              onChange={this.handleChange("password")}
              value={password}
              placeholder="Password"
            />
            <input type="submit" value="Continue →" />
          </form>
          {this.formFoot()}
        </div>
      </div>
    );
  }
}

export default SessionForm;
