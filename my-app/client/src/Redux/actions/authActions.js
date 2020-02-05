import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_GOLFER,
  GOLFER_LOADING,
  UPDATE_DIFFERENTIAL,
  UPDATE_HANDICAP,
  UPDATE_REQUEST,
  DECLINE_REQUEST,
  ACCEPT_REQUEST,
  ADD_PENDING_OUTING
} from "./types";

export const addPendingOuting = (outing) => dispatch => {
  axios.post("/outings/addPendingOuting", outing)
  .then(
    dispatch(addPending(outing))
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response
    })
  )
}

export const acceptRequest = (acceptObject) => dispatch => {
  axios.post("/Golfers/acceptRequest", acceptObject)
    .then(res => {
      dispatch(accept(acceptObject));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    )
}

export const declineRequest = (declineObject) => dispatch => {
  console.log("declineObject: ", declineObject)
  axios.post("/Golfers/declineRequest", declineObject)
    .then(res => {
      dispatch(rejectRequest(declineObject.username));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    )
}


//Add sentRequests and receivedRequests to current and target golfer
export const addRequests = (userObject) => dispatch => {
  return(
    axios.post("/Golfers/sendRequest", userObject)
      .then(res => {
        dispatch(updateRequest(userObject));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response
        })
      )
  )
}


//Search user
export const searchUser = (user) => dispatch => {
  const userObject = {username: user};
  return(
    axios.post("/Golfers/search", userObject)
      .then(res => {
        console.log("res.data.exists", res.data.exists);
        return {exists: res.data.exists, id: res.data.id};
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
    )
}

// Add Differentials
export const addDifferentials = (differential) => dispatch => {
  console.log("addDifferntial called");

  dispatch(updateDifferentials(differential));
  axios.post("/Golfers/addDifferntial", differential)
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Add handicaps
export const addHandicaps = (handicap) => dispatch => {

  console.log("handicap: ", handicap)
  dispatch(updateHandicaps(handicap));
  axios.post("/Golfers/addHandicap", handicap)
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Register User
export const registerGolfer = (userData) => dispatch => {
  console.log("registerGolfer")
  axios
    .post("/Golfers/register", userData)
    //.then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginGolfer = userData => dispatch => {
  console.log("loginGolfer")
  axios
    .post("/Golfers/login", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);

      console.log("decoded: ", decoded);

      // Set current user
      //findGolfer(decoded.id);

      dispatch(setCurrentGolfer(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addPending = outing => {
  console.log("addPending");
  return {
    type: ADD_PENDING_OUTING,
    payload: outing
  }
};

export const accept = user => {
  return {
    type: ACCEPT_REQUEST,
    payload: user
  }
};

export const rejectRequest = user => {
  return {
    type: DECLINE_REQUEST,
    payload: user
  }
};

export const updateRequest = request => {
  return {
    type: UPDATE_REQUEST,
    payload: request
  }
};

//Update user differntials
export const updateDifferentials = differential => {
  return{
    type: UPDATE_DIFFERENTIAL,
    payload: differential
  }
};

//Update Handicaps
export const updateHandicaps = handicap => {
  return{
    type: UPDATE_HANDICAP,
    payload: handicap
  }
};

// Set logged in user
export const setCurrentGolfer = decoded => {
  console.log("decoded: ", decoded);
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
