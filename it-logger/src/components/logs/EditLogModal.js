import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TechSelectOptions from "../techs/TechSelectOptions";
import { toast } from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import { updateLog, clearCurrentLog } from "../../actions/logActions";

const EditLogModal = ({ updateLog, clearCurrentLog, currentLog }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    if (currentLog) {
      setMessage(currentLog.message);
      setAttention(currentLog.attention);
      setTech(currentLog.tech);
    }
  }, [currentLog]);

  const onSubmit = () => {
    if (message === "" || tech === "") {
      toast({ html: "Prease enter a message and tech" });
    } else {
      updateLog({
        ...currentLog,
        message: message,
        tech: tech,
        attention: attention,
        date: new Date(),
      });

      toast({ html: `Log updated by ${tech}` });

      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              className="browser-default"
            >
              <option value="" disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={() => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect btn blue"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  // width: "75%",
  // height: "75%",
};

EditLogModal.propTypes = {
  updateLog: PropTypes.func.isRequired,
  clearCurrentLog: PropTypes.func.isRequired,
  currentLog: PropTypes.object,
};

const mapStateToProps = (state) => ({
  currentLog: state.log.current,
});

export default connect(mapStateToProps, { updateLog, clearCurrentLog })(
  EditLogModal
);
