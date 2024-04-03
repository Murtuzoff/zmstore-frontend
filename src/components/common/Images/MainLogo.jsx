import React from 'react';
import PropTypes from 'prop-types';

const MainLogo = ({ width, height }) => (
  <img
    className="main-logo"
    src="/images/main-logo.png"
    alt="logo"
    width={width}
    height={height}
  />
);

MainLogo.defaultProps = {
  width: '285px',
  height: '150px',
};

MainLogo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default MainLogo;
