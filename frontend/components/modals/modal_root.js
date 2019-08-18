import React from "react";
import { connect } from "react-redux";
import NewChannelFormContainer from "../channel/new_channel_form_container";
import NewDmForm from "../channel/new_dm_form_container";
import JoinChannelContainer from "../channel/joinChannel/joinChannelContainer";

const MODAL_COMPONENTS = {
  NEW_CHANNEL: NewChannelFormContainer,
  NEW_DM: NewDmForm,
  JOIN_CHANNEL: JoinChannelContainer
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) return null;
  const SelectedModal = MODAL_COMPONENTS[modalType];
  return <SelectedModal {...modalProps} />;
};

export default connect(state => state.modal)(ModalRoot);
