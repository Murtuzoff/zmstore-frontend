import React from 'react';
import PropTypes from 'prop-types';

const Reviews = ({ numReviews }) => (
  <>
    {numReviews % 10 === 0 && (
      <div>
        <span>{numReviews}</span> <span>отзывов</span>
      </div>
    )}

    {numReviews % 10 === 1 && (
      <div>
        <span>{numReviews}</span> <span>отзыв</span>
      </div>
    )}

    {numReviews % 10 >= 2 && numReviews % 10 <= 4 && (
      <div>
        <span>{numReviews}</span> <span>отзыва</span>
      </div>
    )}

    {numReviews % 10 >= 5 && numReviews % 10 <= 9 && (
      <div>
        <span>{numReviews}</span> <span>отзывов</span>
      </div>
    )}
  </>
);

Reviews.defaultProps = {
  numReviews: null,
};

Reviews.propTypes = {
  numReviews: PropTypes.number,
};

export default Reviews;
