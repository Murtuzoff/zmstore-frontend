import React from 'react';
import PropTypes from 'prop-types';

const StarFullIcon = ({ width, height }) => {
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
      <path d="M4.59,23c.19-1.35.38-2.66.56-4l.57-4a.39.39,0,0,0-.14-.4L1.45,10.32,0,8.81l1-.19L8,7.4a.36.36,0,0,0,.28-.22L11.85.28c0-.09.09-.17.15-.28.06.1.1.18.14.26l3.62,6.88a.47.47,0,0,0,.35.27c2.47.42,4.93.87,7.39,1.3l.5.1-.19.2c-1.8,1.86-3.59,3.73-5.4,5.59a.42.42,0,0,0-.13.4q.39,2.68.76,5.38c.12.86.24,1.71.37,2.62l-.25-.11-6.94-3.47a.46.46,0,0,0-.44,0L4.83,22.89Z" />
    </svg>
  );
};

StarFullIcon.defaultProps = {
  width: '17px',
  height: '16px',
};

StarFullIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default StarFullIcon;
