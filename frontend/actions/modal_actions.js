export const SHOW_MODAL = "SHOW_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const createChannelModal = () => ({
  type: SHOW_MODAL,
  modalType: "NEW_CHANNEL"
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

//
// export const openChannelModal = () => dispatch =>
//   dispatch(createChannelModal());

// export const closeAllModal = () => dispatch => dispatch(closeModal());
