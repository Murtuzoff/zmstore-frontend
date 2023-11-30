import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

const MessageDanger = ({ message, marginBottom }) => (
  <div className="message-danger" style={{ marginBottom: `${marginBottom}` }}>
    <span>{message}</span>
  </div>
);

MessageDanger.defaultProps = {
  message: '',
  marginBottom: '',
};

MessageDanger.propTypes = {
  message: PropTypes.string,
  marginBottom: PropTypes.string,
};

export default MessageDanger;
