import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
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
        <strong>ОТЗЫВЫ</strong>

        {productInfo.reviews.length === 0 ? (
          <div className="list-review-data">
            <strong>Пока нет отзывов...</strong>
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
          <strong>НАПИСАТЬ ОТЗЫВ</strong>

          {loading && <Loading />}
          {error && <MessageDanger message={error} />}
          {message && <MessageSuccess message={message} />}

          <div className="add-review-rating">
            <span>Оцените товар:</span>

            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="5">5 - Отлично</option>
              <option value="4">4 - Хорошо</option>
              <option value="3">3 - Нормально</option>
              <option value="2">2 - Плохо</option>
              <option value="1">1 - Ужасно</option>
            </select>
          </div>

          <div className="add-review-comment">
            <span>Комментарий:</span>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <WoodenButton width="inherit" label="ОТПРАВИТЬ" type="submit" />
        </form>
      ) : (
        <div className="add-review">
          <strong>НАПИСАТЬ ОТЗЫВ</strong>

          <div className="add-review-rating">
            <div style={{ textAlign: 'center' }}>
              <span>Пожалуйста, осуществите</span>{' '}
              <Link
                to={`/login?redirect=product/${params.id}` || '/'}
                style={{ color: '#211' }}
              >
                <strong>
                  <u>ВХОД</u>
                </strong>
              </Link>
              <span>, чтобы оставить отзыв</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
