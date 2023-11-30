import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

const Loading = ({ color, marginBottom }) => (
  <div className="loading" style={{ marginBottom: `${marginBottom}` }}>
    <div
      className="loading-circle"
      style={{ borderColor: `${color}`, borderBottomColor: 'transparent' }}
    />
  </div>
);

Loading.defaultProps = {
  color: '#544',
  marginBottom: '',
};

Loading.propTypes = {
  color: PropTypes.string,
  marginBottom: PropTypes.string,
};

export default Loading;
