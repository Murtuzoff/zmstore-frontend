import React from 'react';
import PropTypes from 'prop-types';

import StarFullIcon from '../../common/Icons/StarIcons/StarFullIcon';
import StarHalfIcon from '../../common/Icons/StarIcons/StarHalfIcon';
import StarEmptyIcon from '../../common/Icons/StarIcons/StarEmptyIcon';

const RatingStars = ({ rating }) => {
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const value = index + 1;

    if (rating >= value) {
      return <StarFullIcon key={value} />;
    }
    if (rating >= value - 0.5) {
      return <StarHalfIcon key={value} />;
    }

    return <StarEmptyIcon key={value} />;
  });

  return <span className="rating-stars">{stars}</span>;
};

RatingStars.defaultProps = {
  rating: '',
};

RatingStars.propTypes = {
  rating: PropTypes.string,
};

export default RatingStars;
