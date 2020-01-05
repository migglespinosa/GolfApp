import {
  SET_CURRENT_GOLFER,
  GOLFER_LOADING,
  UPDATE_DIFFERENTIAL,
  UPDATE_HANDICAP
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_GOLFER:
      console.log("action.payload: ", action.payload);
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GOLFER_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_DIFFERENTIAL:

      const differentials = state.user.differentials;
      differentials.push(action.payload);

      return {
        ...state,
        user: Object.assign({}, state.user, {
          differential: differentials
        })
      }
    case UPDATE_HANDICAP:
      const handicap = state.user.handicap;
      console.log("state.user.handicaps: ", state.user.handicap);
      handicap.push(action.payload);

      return {
        ...state,
        user: Object.assign({}, state.user, {
          handicap: handicap
        })
      }
    default:
      return state;
  }
}
