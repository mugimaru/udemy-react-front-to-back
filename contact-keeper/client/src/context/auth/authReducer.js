import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const onAuthFail = (state, errorMsg) => {
  localStorage.removeItem("token");
  return {
    ...state,
    token: null,
    loading: false,
    isAuthenticated: false,
    user: null,
    error: errorMsg,
  };
};

const onAuthSuccess = (state, token) => {
  localStorage.setItem("token", token);
  return {
    ...state,
    token: token,
    isAuthenticated: true,
    loading: false,
  };
};

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case REGISTER_SUCCESS:
      return onAuthSuccess(state, action.payload.token);

    case LOGIN_SUCCESS:
      return onAuthSuccess(state, action.payload.token);

    case REGISTER_FAIL:
      return onAuthFail(state, action.payload);

    case LOGIN_FAIL:
      return onAuthFail(state, action.payload);

    case AUTH_ERROR:
      return onAuthFail(state, action.payload);

    case CLEAR_ERRORS:
      return { ...state, error: null };

    case LOGOUT:
      return onAuthFail(state, null);

    default:
      return state;
  }
};
