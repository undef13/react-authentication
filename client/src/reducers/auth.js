import { 
  SET_CURRENT_USER,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGOUT  } from "../constants/actionTypes";

const initialState = {
  user: null,
  isAuthenticated: false
}

const auth = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        ...action.payload
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state, 
        ...action.payload
      }
    case USER_LOGIN_FAILURE:
      return {
        ...state, user: null, isAuthenticated: false
      }
    case USER_REGISTER_SUCCESS:
      return state;
    case USER_REGISTER_FAILURE:
      return state;
    case USER_LOGOUT:
      return {
        ...state, 
        user: null,
        isAuthenticated: false
      }
    default: 
      return state;
  }
}

export default auth;