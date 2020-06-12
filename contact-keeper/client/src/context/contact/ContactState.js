import React, { useReducer } from "react";
import axios from "axios";

import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from "../types";

const AXIOS_CONTENT_TYPE_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
};

const ContactState = (props) => {
  const inititalState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(contactReducer, inititalState);

  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  const addContact = async (contact) => {
    try {
      const res = await axios.post(
        "/api/contacts",
        contact,
        AXIOS_CONTENT_TYPE_CONFIG
      );
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }

    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateContact = async (contact) => {
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        AXIOS_CONTENT_TYPE_CONFIG
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
