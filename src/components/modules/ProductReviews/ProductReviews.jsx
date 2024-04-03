import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/az';
import 'moment/locale/ru';

import {
  productReviewAction,
  productReviewResetAction,
} from '../../../redux/actions/productActions';

import RatingStars from '../RatingStars/RatingStars';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';
import Loading from '../../common/Messages/Loading';
import MessageDanger from '../../common/Messages/MessageDanger';
import MessageSuccess from '../../common/Messages/MessageSuccess';

import './ProductReviews.css';

const ProductReviews = () => {
  const { t, i18n } = useTranslation();

  if (i18n.language === 'az') moment.locale('az');
  if (i18n.language === 'en') moment.locale('en');
  if (i18n.language === 'ru') moment.locale('ru');

  const { userInfo } = useSelector((state) => state.userLogin);
  const { productInfo } = useSelector((state) => state.productItem);
  const { loading, error, message } = useSelector(
    (state) => state.productReview,
  );

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const params = useParams();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(productReviewAction({ productId: params.id, rating, comment }));
  };

  useEffect(() => {
    dispatch(productReviewResetAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="product-reviews">
      <div className="list-review">
        <strong>{t('REVIEWS')}</strong>

        {productInfo.reviews.length === 0 ? (
          <div className="list-review-data">
            <strong>{t('noReviewsYet')}...</strong>
          </div>
        ) : (
          productInfo.reviews.map((reviewInfo) => (
            <div className="list-review-data" key={reviewInfo._id}>
              <strong>{reviewInfo.userName}</strong>

              <RatingStars rating={reviewInfo.rating} />

              <span>{moment(reviewInfo.createdAt).format('LLL')}</span>

              {reviewInfo.comment && (
                <div className="list-review-text">
                  <span>{reviewInfo.comment}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {userInfo ? (
        <form className="add-review" onSubmit={submitHandler}>
          <strong>{t('addReview')}</strong>

          {loading && <Loading />}
          {error && <MessageDanger message={error} />}
          {message && <MessageSuccess message={message} />}

          <div className="add-review-rating">
            <span>{t('rateTheProduct')}:</span>

            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="5">5 - {t('excellent')}</option>
              <option value="4">4 - {t('good')}</option>
              <option value="3">3 - {t('normal')}</option>
              <option value="2">2 - {t('bad')}</option>
              <option value="1">1 - {t('terrible')}</option>
            </select>
          </div>

          <div className="add-review-comment">
            <span>{t('addComment')}:</span>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <WoodenButton width="inherit" label={t('SUBMIT')} type="submit" />
        </form>
      ) : (
        <div className="add-review">
          <strong>{t('addReview')}</strong>

          <div className="add-review-rating">
            <div style={{ textAlign: 'center', width: '100%' }}>
              <span>{t('pleaseDo')}</span>{' '}
              <Link
                to={`/login?redirect=product/${params.id}` || '/'}
                style={{ color: '#211' }}
              >
                <strong>
                  <u>{t('LOGIN')}</u>{' '}
                </strong>
              </Link>
              <span>{t('toAddReview')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
