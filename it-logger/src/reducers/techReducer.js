import { GET_TECHS, SET_LOADING, TECHS_ERROR } from "../actions/types";

const initalState = {
  techs: null,
  loading: false,
  error: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_TECHS:
      return { ...state, techs: action.payload, loading: false };

    case TECHS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SET_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};
