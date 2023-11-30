import React from 'react';
import PropTypes from 'prop-types';

import './CountdownCircle.css';

const CountdownCircle = ({ countdown, setCount }) => (
  <div className="countdown-circle">
    <svg>
      <circle
        r="10"
        cx="13"
        cy="13"
        style={{ animation: `countdown ${countdown}s linear` }}
      />
    </svg>
    <button type="button" onClick={() => setCount(0)}>
      x
    </button>
  </div>
);

CountdownCircle.defaultProps = {
  countdown: 3,
  setCount: () => {},
};

CountdownCircle.propTypes = {
  countdown: PropTypes.number,
  setCount: PropTypes.func,
};

export default CountdownCircle;
