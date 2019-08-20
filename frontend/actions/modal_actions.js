export const SHOW_MODAL = "SHOW_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const createChannelModal = () => ({
  type: SHOW_MODAL,
  modalType: "NEW_CHANNEL"
});

export const createDmModal = () => ({
  type: SHOW_MODAL,
  modalType: "NEW_DM"
});

export const joinChannelModal = () => ({
  type: SHOW_MODAL,
  modalType: "JOIN_CHANNEL"
});

export const searchModal = () => ({
  type: SHOW_MODAL,
  modalType: "SEARCH"
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
