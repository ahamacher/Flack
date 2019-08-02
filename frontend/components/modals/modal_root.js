import React from "react";
import { connect } from "react-redux";
import NewChannelFormContainer from "../channel/new_channel_form_container";

const MODAL_COMPONENTS = {
  NEW_CHANNEL: NewChannelFormContainer
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) return null;

  const SelectedModal = MODAL_COMPONENTS[modalType];
  return <SelectedModal {...modalProps} />;
};

export default connect(state => state.modal)(ModalRoot);
