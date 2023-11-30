import React from 'react';
import PropTypes from 'prop-types';

const StarHalfIcon = ({ width, height }) => {
  const formattedWidth = width.replace('px', '');
  const formattedHeight = height.replace('px', '');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={formattedWidth}
      height={formattedHeight}
      viewBox="0 0 24 23"
      fill="#fd0"
      filter="drop-shadow(0 0 1.4px #540)"
    >
      <path d="M19.39,23l-.24-.11-6.93-3.46a.46.46,0,0,0-.44,0L4.83,22.89,4.6,23c.08-.61.15-1.19.23-1.77l.75-5.31c0-.29.08-.59.14-.88a.47.47,0,0,0-.15-.46c-1.33-1.37-2.66-2.76-4-4.14L0,8.81l1-.18Q4.48,8,8,7.4a.34.34,0,0,0,.27-.22L11.85.28A2.14,2.14,0,0,1,12,0c.27.51.52,1,.78,1.47l3,5.7a.39.39,0,0,0,.32.23L23,8.62l1,.19c-.08.08-.13.15-.19.2L18.4,14.62a.38.38,0,0,0-.12.36c.24,1.64.48,3.27.71,4.91.14.95.26,1.91.39,2.87C19.39,22.83,19.38,22.89,19.39,23ZM12.05,5.46H12s0,.07,0,.11V16.37a.27.27,0,0,0,.19.27l3.88,1.91.24.11c0-.19-.05-.35-.07-.51l-.57-4.09a.45.45,0,0,1,.1-.29c.87-.92,1.75-1.82,2.62-2.73l.56-.58-.3-.06c-1.4-.25-2.79-.51-4.19-.75a.41.41,0,0,1-.32-.25c-.51-1-1-2-1.55-2.94Z" />
    </svg>
  );
};

StarHalfIcon.defaultProps = {
  width: '17px',
  height: '16px',
};

StarHalfIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default StarHalfIcon;
