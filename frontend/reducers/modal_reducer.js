import { SHOW_MODAL, CLOSE_MODAL } from "../actions/modal_actions";
import { RECEIVE_CHANNEL } from "../actions/channel_actions";

const initialState = {
  modalType: null
};

const modalReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType
      };
    case CLOSE_MODAL:
      return initialState;
    case RECEIVE_CHANNEL:
      return initialState;
    default:
      return state;
  }
};

export default modalReducer;
