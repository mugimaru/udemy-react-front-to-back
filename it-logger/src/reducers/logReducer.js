import { GET_LOGS, SET_LOADING, ADD_LOG, LOGS_ERROR } from "../actions/types";

const initalState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case GET_LOGS:
      return { ...state, loading: false, logs: action.payload };

    case ADD_LOG:
      return {
        ...state,
        loading: false,
        logs: [...state.logs, action.payload],
      };

    case LOGS_ERROR:
      console.error(action.payload);
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
