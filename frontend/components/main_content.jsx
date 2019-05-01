import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SplashContainer from "./splash/splash_container";
import LoginFormContainer from "./session_form/login_container";
import SignupFormContainer from "./session_form/signup_container";
import ChannelContainer from "./channel/channel_container";

const MainContent = () => (
  <div>
    <Route exact path="/" component={SplashContainer} />
    <ProtectedRoute exact path="/channel" component={ChannelContainer} />
    <AuthRoute exact path="/login" component={LoginFormContainer} />
    <AuthRoute exact path="/signup" component={SignupFormContainer} />
  </div>
);

export default MainContent;
