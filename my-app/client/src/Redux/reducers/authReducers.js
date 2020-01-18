import {
  SET_CURRENT_GOLFER,
  GOLFER_LOADING,
  UPDATE_DIFFERENTIAL,
  UPDATE_HANDICAP,
  UPDATE_REQUEST,
  DECLINE_REQUEST,
  ACCEPT_REQUEST
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
}
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
      };

    case UPDATE_HANDICAP:
      const handicap = state.user.handicap;
      handicap.push(action.payload);

      return {
        ...state,
        user: Object.assign({}, state.user, {
          handicap: handicap
        })
      };

    case UPDATE_REQUEST:
      const sentRequests = state.user.sentRequests;
      sentRequests.push(action.payload);

      return {
        ...state,
        user: Object.assign({}, state.user, {
          sentRequests: sentRequests
        })
      };

    case DECLINE_REQUEST:
      const receivedRequests = state.user.receivedRequests;
      console.log("action.payload: ", action.payload);
      const filteredRequests = receivedRequests.filter(request => {
        if(request.username == action.payload){
          return false;
        }

      })
      console.log("filteredRequests: ", filteredRequests);

      return {
        ...state,
        user: Object.assign({}, state.user, {
          receivedRequests: filteredRequests
        })
      };
      
    case ACCEPT_REQUEST:
      const newFriends = state.user.friends;
      newFriends.push(action.payload);

      const receivedRequestsAccepted = state.user.receivedRequests;
      const filteredRequestsAccepted = receivedRequestsAccepted.filter(request => {
        if(request.username == action.payload.username){
          return false;
        }
      });

      console.log("receivedRequestsAccepted: ", receivedRequestsAccepted)

      return {
        ...state,
        user: Object.assign({}, state.user, {
          receivedRequests: filteredRequestsAccepted,
          friends: newFriends
        })
      }
    default:
      return state;
  }
}
