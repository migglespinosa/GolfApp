import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_GOLFER,
  GOLFER_LOADING
} from "./types";
// Register User
export const registerGolfer = (userData, history) => dispatch => {
  axios
    .post("/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginGolfer = userData => dispatch => {
  axios
    .post("/login", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentGolfer(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentGolfer = decoded => {
  return {
    type: SET_CURRENT_GOLFER,
    payload: decoded
  };
};
// User loading
export const setGolferLoading = () => {
  return {
    type: GOLFER_LOADING
  };
};
// Log user out
export const logoutGolfer = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentGolfer({}));
};
