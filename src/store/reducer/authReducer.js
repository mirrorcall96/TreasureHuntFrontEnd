import * as actiontype from "../action/types";

const initialState = {
  user: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontype.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actiontype.ADD_BALANCE:
      return {
        ...state,
        user: { ...state.user, balance: action.payload },
      };
    case actiontype.REMOVE_BALANCE:
      return {
        ...state,
        user: { ...state.user, balance: state.user.balance - 5 },
      };
    default:
      return state;
  }
};
export default reducer;
