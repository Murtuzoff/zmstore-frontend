import React from 'react';
import './ProfileButton.css';
import PropTypes from 'prop-types';

const ProfileButton = ({ isActive, label, count, onClick }) => (
  <button
    className="profile-button"
    style={{ background: isActive ? '#dfd' : '#fff' }}
    type="button"
    onClick={onClick}
  >
    <strong>{label}</strong>
    {count && <strong>{count}</strong>}
  </button>
);

ProfileButton.defaultProps = {
  isActive: false,
  label: '',
  count: null,
  onClick: () => {},
};

ProfileButton.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string,
  count: PropTypes.number,
  onClick: PropTypes.func,
};

export default ProfileButton;
