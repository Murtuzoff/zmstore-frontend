import React from 'react';
import PropTypes from 'prop-types';
import './WoodenButton.css';

const WoodenButton = ({ width, maxWidth, label, type, onClick }) => (
  <button
    className="wooden-button"
    style={{
      width: `${width}`,
      maxWidth: `${maxWidth}`,
    }}
    type={type === 'submit' ? 'submit' : 'button'}
    onClick={onClick}
  >
    <img
      src="/images/wooden-button.jpg"
      alt="wooden-button"
      style={{
        position: 'absolute',
        width: 'inherit',
        maxWidth: 'inherit',
        height: 'inherit',
        borderRadius: 'inherit',
      }}
    />
    <span>{label}</span>
  </button>
);

WoodenButton.defaultProps = {
  width: '450px',
  maxWidth: '',
  label: 'BUTTON',
  type: 'button',
  onClick: () => {},
};

WoodenButton.propTypes = {
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default WoodenButton;
