import * as actiontype from "../action/types";

const initialState = {
  items: [],
  history: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontype.FETCH_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case actiontype.FETCH_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case actiontype.OPEN_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => action.payload.id !== item.id),
        history: [...state.history, action.payload],
      };
    default:
      return state;
  }
};
export default reducer;
