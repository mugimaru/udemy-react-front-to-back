import React, { useReducer } from "react";
import { v4 } from "uuid";
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
} from "../types";

const ContactState = (props) => {
  const inititalState = {
    contacts: [
      {
        id: 1,
        name: "Foo Bar",
        email: "foo@bar.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Baz Qux",
        email: "baz@qux.com",
        phone: "222-222-2221",
        type: "personal",
      },
      {
        id: 3,
        name: "Ivan",
        email: "ivan@gmail.com",
        phone: "555-555-5555",
        type: "professional",
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, inititalState);

  // Add Contact

  const addContact = (contact) => {
    contact.id = v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // Delete Contact

  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
