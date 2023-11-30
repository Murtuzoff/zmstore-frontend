import React from 'react';
import PropTypes from 'prop-types';

const AdditionalLogo = ({ width, height }) => (
  <img
    className="additional-logo"
    src="/images/additional-logo.png"
    alt="logo"
    width={width}
    height={height}
  />
);

AdditionalLogo.defaultProps = {
  width: '150px',
  height: '150px',
};

AdditionalLogo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default AdditionalLogo;
