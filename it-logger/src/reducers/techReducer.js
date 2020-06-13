import {
  GET_TECHS,
  SET_LOADING,
  ADD_TECH,
  DELETE_TECH,
  TECHS_ERROR,
} from "../actions/types";

const initalState = {
  techs: null,
  loading: false,
  error: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_TECHS:
      return { ...state, techs: action.payload, loading: false };

    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        loading: false,
      };

    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter((t) => t.id !== action.payload),
        loading: false,
      };

    case TECHS_ERROR:
      console.error(action.payload);
      return { ...state, loading: false, error: action.payload };

    case SET_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};
