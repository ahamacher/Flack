import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SplashContainer from "./splash/splash_container";
import LoginFormContainer from "./session_form/login_container";
import SignupFormContainer from "./session_form/signup_container";
import ChannelContainer from "./channel/channel_container";

const MainContent = () => (
  <div>
    <Switch>
      <ProtectedRoute exact path="/channel" component={ChannelContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/channel" />
      <AuthRoute exact path="/" component={SplashContainer} />
      <Route exact path="/" component={SplashContainer} />
      <Route path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default MainContent;
