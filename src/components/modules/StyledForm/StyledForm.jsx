import React from 'react';
import PropTypes from 'prop-types';
import './StyledForm.css';

const StyledForm = ({ onSubmit, children }) => (
  <form className="styled-form" onSubmit={onSubmit}>
    {children}
  </form>
);

StyledForm.defaultProps = {
  onSubmit: () => {},
};

StyledForm.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default StyledForm;
