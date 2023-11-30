import React from 'react';
import PropTypes from 'prop-types';
import './SocialIcon.css';

const FacebookIcon = ({ width, height }) => {
  const formattedWidth = width.replace('px', '');
  const formattedHeight = height.replace('px', '');

  return (
    <span
      className="social-icon"
      style={{
        width: `${width}`,
        height: `${height}`,
        cursor: 'pointer',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={formattedWidth}
        height={formattedHeight}
        viewBox="0 0 35 35"
      >
        <path d="M15.0167 34.08C10.8315 33.3122 7.08145 31.0153 4.49585 27.636C1.91024 24.2566 0.673901 20.0364 1.02726 15.7961C1.38062 11.5558 3.29842 7.59845 6.4077 4.6937C9.51698 1.78895 13.5955 0.144426 17.85 0.0799561C22.1675 0.108589 26.3124 1.77895 29.4433 4.75201C32.5742 7.72506 34.4566 11.778 34.7083 16.0883C35.0086 20.334 33.7053 24.5378 31.0561 27.8691C28.4068 31.2004 24.6043 33.4166 20.4 34.08V22.18H24.3667L25.075 17.2216H20.4V13.68C20.379 13.3769 20.4233 13.0728 20.5298 12.7883C20.6362 12.5038 20.8025 12.2454 21.0173 12.0306C21.2321 11.8158 21.4905 11.6495 21.775 11.5431C22.0595 11.4366 22.3636 11.3923 22.6667 11.4133H25.2167V10.9883C25.1958 9.75884 25.2431 8.52917 25.3583 7.30496C25.3583 7.22981 25.3285 7.15774 25.2753 7.10461C25.2222 7.05147 25.1501 7.02162 25.075 7.02162C23.3466 6.69415 21.5769 6.64632 19.8333 6.87996C18.6708 7.05711 17.5983 7.61005 16.7796 8.45427C15.961 9.29848 15.4413 10.3875 15.3 11.555C15.0653 12.3835 14.9695 13.2451 15.0167 14.105V17.2216H10.7667V22.18H15.0167V34.08Z" />
      </svg>
    </span>
  );
};

FacebookIcon.defaultProps = {
  width: '34px',
  height: '34px',
};

FacebookIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default FacebookIcon;
