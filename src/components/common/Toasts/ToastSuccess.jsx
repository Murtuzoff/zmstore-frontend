import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import CountdownCircle from './CountdownCircle';

import './Toast.css';

const ToastSuccess = ({ label, countdown }) => {
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
      <div className="toast-success">
        <svg
          className="toast-image"
          xmlns="http://www.w3.org/2000/svg"
          width="36px"
          height="36px"
          viewBox="0 0 36 36"
          fill="#fff"
        >
          <path d="M36,18A18,18,0,1,1,18,0,18,18,0,0,1,36,18ZM18,32.66A14.66,14.66,0,1,0,3.36,18,14.7,14.7,0,0,0,18,32.66Z" />
          <path d="M15.75,24.82,8.92,18l2.33-2.33,4.45,4.45,9-9,2.38,2.38Z" />
        </svg>
        <span className="toast-text">{label}</span>
        <CountdownCircle countdown={countdown} setCount={setCount} />
      </div>
    )
  );
};

ToastSuccess.defaultProps = {
  label: 'ToastSuccess',
  countdown: 3,
};

ToastSuccess.propTypes = {
  label: PropTypes.string,
  countdown: PropTypes.number,
};

export default ToastSuccess;
