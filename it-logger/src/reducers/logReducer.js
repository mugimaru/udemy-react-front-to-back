import {
  GET_LOGS,
  SET_LOADING,
  ADD_LOG,
  LOGS_ERROR,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from "../actions/types";

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

    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== action.payload),
      };

    case SET_CURRENT:
      return { ...state, current: action.payload };

    case CLEAR_CURRENT:
      return { ...state, current: null };

    case UPDATE_LOG:
      return {
        ...state,
        loading: false,
        logs: state.logs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        ),
        current: null,
      };

    case SEARCH_LOGS:
      return { ...state, loading: false, logs: action.payload };

    default:
      return state;
  }
};
