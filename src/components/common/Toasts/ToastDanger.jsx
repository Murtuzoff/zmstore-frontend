import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import CountdownCircle from './CountdownCircle';

import './Toast.css';

const ToastDanger = ({ label, countdown }) => {
  const [count, setCount] = useState(countdown);

  const timerRef = useRef(null);

  useEffect(() => {
    if (count > 0) {
      timerRef.current = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      clearTimeout(timerRef.current);
    }
  }, [count]);

  return (
    count > 0 && (
      <div className="toast-danger">
        <svg
          className="toast-image"
          xmlns="http://www.w3.org/2000/svg"
          width="36px"
          height="36px"
          viewBox="0 0 36 36"
          fill="#fff"
        >
          <path d="M36,17.75A18,18,0,1,1,17.31,0,17.93,17.93,0,0,1,36,17.75ZM18,3.35A14.66,14.66,0,1,0,32.64,18.07,14.67,14.67,0,0,0,18,3.35Z" />
          <path d="M19.67,9V20.23H16.33V9Z" />
          <path d="M16.33,25.87V22.53h3.33v3.34Z" />
        </svg>
        <span className="toast-text">{label}</span>
        <CountdownCircle countdown={countdown} setCount={setCount} />
      </div>
    )
  );
};

ToastDanger.defaultProps = {
  label: 'ToastDanger',
  countdown: 3,
};

ToastDanger.propTypes = {
  label: PropTypes.string,
  countdown: PropTypes.number,
};

export default ToastDanger;
