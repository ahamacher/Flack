/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import Header from "./splash_header";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
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
          />
          <Link
            to={{
              pathname: "/signup",
              state: {
                email
              }
            }}
          >
            Get Started
          </Link>
        </span>
        <span>
          Already using Flack?
          <Link to="/login">Sign in.</Link>
        </span>
      </div>
    );
  }

  appInfo() {
    return (
      <div>
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
    return (
      <div className="pictures">
        <div>
          <img
            src="https://3c1703fe8d.site.internapcdn.net/newman/csz/news/800/2017/cooperationd.jpg"
            alt=""
          />
          <p>Building greate teamwork with Flack</p>
        </div>
        <div>
          <img
            src="https://assets.entrepreneur.com/content/3x2/2000/20150327221922-success-winning-inspirational.jpeg"
            alt=""
          />
          <p>Become sucessful with Flack</p>
        </div>
        <div>
          <img
            src="https://www.alturalearning.com/wp-content/uploads/tips-for-better-communication.jpg"
            alt=""
          />
          <p>Learn to communicate better with Flack</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <header className="splash-head">
          <Header />
        </header>
        <main>
          <h1>Imagine what you'll accomplish together</h1>
          {this.imageLoop()}
          {this.appInfo()}
          {this.loginGetStarted()}
        </main>
      </div>
    );
  }
}

export default Splash;
