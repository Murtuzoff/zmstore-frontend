import React from 'react';
import PropTypes from 'prop-types';
import './RemoveButton.css';

const RemoveButton = ({ top, right, bottom, left, onClick }) => (
  <button
    className="remove-button"
    type="button"
    onClick={onClick}
    style={{
      top: `${top}`,
      right: `${right}`,
      bottom: `${bottom}`,
      left: `${left}`,
    }}
  >
    <div className="first-line" />
    <div className="second-line" />
  </button>
);

RemoveButton.defaultProps = {
  top: '',
  right: '',
  bottom: '',
  left: '',
  onClick: () => {},
};

RemoveButton.propTypes = {
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  onClick: PropTypes.func,
};

export default RemoveButton;
