import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Reviews = ({ numReviews }) => {
  const { t } = useTranslation();

  return (
    <>
      {numReviews % 10 === 0 && (
        <div>
          <span>{numReviews}</span> <span>{t('reviews0')}</span>
        </div>
      )}

      {numReviews % 10 === 1 && (
        <div>
          <span>{numReviews}</span> <span>{t('reviews1')}</span>
        </div>
      )}

      {numReviews % 10 >= 2 && numReviews % 10 <= 4 && (
        <div>
          <span>{numReviews}</span> <span>{t('reviews2_4')}</span>
        </div>
      )}

      {numReviews % 10 >= 5 && numReviews % 10 <= 9 && (
        <div>
          <span>{numReviews}</span> <span>{t('reviews5_9')}</span>
        </div>
      )}
    </>
  );
};

Reviews.defaultProps = {
  numReviews: null,
};

Reviews.propTypes = {
  numReviews: PropTypes.number,
};

export default Reviews;
