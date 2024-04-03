import React from 'react';
import PropTypes from 'prop-types';

const StarEmptyIcon = ({ width, height }) => {
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
      <path d="M4.59,23c.06-.46.12-.87.17-1.29L5.57,16c0-.35.09-.71.15-1.06a.33.33,0,0,0-.1-.34L.23,9.06A1.41,1.41,0,0,0,0,8.88L0,8.8l1-.18L8,7.4a.36.36,0,0,0,.3-.22L11.86.26,12,0l.13.25Q14,3.7,15.77,7.17a.44.44,0,0,0,.32.24l7.39,1.3.52.1-1,1c-1.52,1.58-3,3.16-4.55,4.73a.51.51,0,0,0-.15.46q.57,3.94,1.12,7.87a.35.35,0,0,0,0,.07l-.2-.09-7-3.47a.43.43,0,0,0-.44,0L4.89,22.86Zm-.2-12.82-.06.1a2.79,2.79,0,0,1,.38.3l3.15,3.29a.43.43,0,0,1,.13.28c-.17,1.29-.36,2.57-.55,3.85-.06.42-.12.83-.19,1.29l.27-.12L11.81,17a.37.37,0,0,1,.38,0l4.29,2.13.24.11a.51.51,0,0,0,0-.1c-.23-1.64-.47-3.27-.7-4.91a.39.39,0,0,1,.09-.39l3.39-3.53.13-.17-.32-.06-4.67-.8a.37.37,0,0,1-.29-.22c-.73-1.41-1.48-2.83-2.22-4.24,0-.08-.09-.15-.15-.25l-.12.23Q10.75,7,9.63,9.1a.35.35,0,0,1-.28.22c-.94.15-1.87.32-2.8.48Z" />
    </svg>
  );
};

StarEmptyIcon.defaultProps = {
  width: '17px',
  height: '16px',
};

StarEmptyIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default StarEmptyIcon;
