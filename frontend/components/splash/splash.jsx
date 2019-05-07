/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import Header from "./splash_header";
import Footer from "../footer";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    const arr = ["picture-l", "picture-m", "picture-s"];
    this.state = {
      email: "",
      arr
    };
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.history.push("/channel");
      return;
    }
    this.loop();
    this.swap = setInterval(this.loop.bind(this), 4000);
  }

  componentWillUnmount() {
    clearInterval(this.swap);
  }

  loop() {
    const first = this.state.arr[0];
    const middle = this.state.arr[1];
    const last = this.state.arr[2];

    this.setState({ arr: [middle, last, first] });
  }

  handleChange(form) {
    return e => this.setState({ [form]: e.target.value });
  }

  loginGetStarted() {
    const { email } = this.state;
    return (
      <div className="login-signup">
        <span>
          <input
            type="text"
            onChange={this.handleChange("email")}
            value={email}
            placeholder="Email address"
          />
          <Link
            to={{
              pathname: "/signup",
              state: {
                email
              }
            }}
            className="button"
          >
            Try for free
          </Link>
        </span>
        <br />
        <span className="greeting-subtext">
          Already using Flack? <Link to="/login">Sign in.</Link>
        </span>
      </div>
    );
  }

  appInfo() {
    return (
      <div className="appinfo">
        <p>
          Flack is a collaboration hub for work, no matter what work you do.
          It’s a place where conversations happen, decisions are made, and flack
          is tossed back and forth. With Flack, your team is better connected
          and more comfortable.
        </p>
      </div>
    );
  }

  imageLoop() {
    const { arr } = this.state;
    return (
      <>
        <div className={arr[0]}>
          <img
            src="https://s3-us-west-1.amazonaws.com/flack-app/img/cooperationd.jpg"
            alt=""
          />
          <p className="imgsub active">
            These people use Flack to communicate and build teamowork
          </p>
        </div>
        <div className={arr[1]}>
          <img
            src="https://s3-us-west-1.amazonaws.com/flack-app/img/winning.jpeg"
            alt=""
          />
          <p className="imgsub active">
            Become sucessful with Flack, Flack users are better situated for
            promotions
          </p>
        </div>
        <div className={arr[2]}>
          <img
            src="https://s3-us-west-1.amazonaws.com/flack-app/img/communication.jpg"
            alt=""
          />
          <p className="imgsub active">
            Learn to communicate better with Flack
          </p>
        </div>
      </>
    );
  }

  render() {
    return (
      <div>
        <header className="splash-head">
          <Header login={this.props.login} />
        </header>
        <main className="main-content">
          <h1>Imagine what you'll accomplish together</h1>
          {this.imageLoop()}
          {this.appInfo()}
          {this.loginGetStarted()}
        </main>
        <footer className="app-footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default Splash;
