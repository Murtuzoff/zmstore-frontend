import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

const MessageSuccess = ({ message, marginBottom }) => (
  <div className="message-success" style={{ marginBottom: `${marginBottom}` }}>
    <span>{message}</span>
  </div>
);

MessageSuccess.defaultProps = {
  message: '',
  marginBottom: '',
};

MessageSuccess.propTypes = {
  message: PropTypes.string,
  marginBottom: PropTypes.string,
};

export default MessageSuccess;
