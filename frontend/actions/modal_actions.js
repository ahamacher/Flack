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

export const closeModal = () => ({
  type: CLOSE_MODAL
});
