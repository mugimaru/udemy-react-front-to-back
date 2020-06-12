import React, { useContext, Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { filtered, contacts, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if ((contacts !== null) & (contacts.length === 0) & !loading) {
    return <h1>Please add a contact</h1>;
  }

  return (
    <Fragment>
      {(contacts !== null) & !loading ? (
        <TransitionGroup>
          {(filtered ? filtered : contacts).map((contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
