import { GET_LOGS, SET_LOADING, ADD_LOG, LOGS_ERROR } from "./types";

export const getLogs = () => async (dispatch) => {
  setLoading();

  try {
    const res = await fetch("/logs");
    const data = await res.json();

    dispatch({ type: GET_LOGS, payload: data });
  } catch (error) {
    dispatch({ type: LOGS_ERROR, payload: error.response.data });
  }
};

export const addLog = (formData) => async (dispatch) => {
  setLoading();

  try {
    const res = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({ type: ADD_LOG, payload: data });
  } catch (error) {
    dispatch({ type: LOGS_ERROR, payload: error.response.data });
  }
};

export const setLoading = () => {
  return { type: SET_LOADING };
};
