import React from 'react';
import PropTypes from 'prop-types';
import './EditButton.css';

const CheckButton = ({ width, height, onClick }) => {
  const formattedWidth = Math.round(width.replace('px', '') / 1.6);
  const formattedHeight = Math.round(height.replace('px', '') / 1.2);

  return (
    <button
      className="edit-button"
      style={{
        width: `${width}`,
        minWidth: `${width}`,
        height: `${height}`,
        minHeight: `${height}`,
      }}
      type="button"
      aria-label="Check"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={formattedWidth}
        height={formattedHeight}
        viewBox="0 0 36 26"
      >
        <path d="M12.82,19.54c1.17-1.17,2.31-2.28,3.43-3.4C21.32,11.05,26.39,5.95,31.47,.85c1-1,2.51-1.13,3.58-.31,.88,.67,1.22,2.05,.72,3.08-.16,.34-.38,.67-.65,.93-6.75,6.76-13.5,13.52-20.26,20.27-1.18,1.18-2.82,1.18-4,0-3.33-3.33-6.67-6.66-10-10-1.04-1.04-1.16-2.55-.24-3.67,.67-.81,1.59-.99,2.59-.78,.54,.11,.98,.42,1.37,.81,2.67,2.7,5.34,5.39,8,8.08,.08,.08,.15,.18,.23,.28Z" />
      </svg>
    </button>
  );
};

CheckButton.defaultProps = {
  width: '26px',
  height: '26px',
  onClick: () => {},
};

CheckButton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
};

export default CheckButton;
