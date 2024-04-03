import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import WoodenProductBackground from '../../common/Backgrounds/WoodenProductBackground';
import EditButton from '../../common/Buttons/EditButton/EditButton';
import ProductImage from '../../common/Images/ProductImage';
import RatingStars from '../RatingStars/RatingStars';
import Reviews from '../../common/Reviews/Reviews';

import './HomeProduct.css';

const HomeProduct = ({ productInfo }) => {
  const userLogin = useSelector((state) => state.userLogin);

  return (
    <div className="home-product">
      <WoodenProductBackground />

      <div className="home-product-container">
        <Link to={`/product/${productInfo._id}`}>
          <ProductImage
            src={productInfo.image}
            alt={productInfo.name}
            width="244px"
            height="244px"
            border="2px solid #ebdccb"
            borderRadius="8px"
            cursor="pointer"
          />

          <div className="home-product-detail">
            <span className="home-product-name">{productInfo.name}</span>
            <RatingStars rating={productInfo.rating} />
            <span className="home-product-reviews">
              <Reviews numReviews={productInfo.numReviews} />
            </span>
            <div className="home-product-price">
              <span>{productInfo.price}</span> <span>$</span>
            </div>
          </div>
        </Link>

        {userLogin?.userInfo?.isAdmin && (
          <Link to={`/product/${productInfo._id}/update`}>
            <EditButton width="36px" height="36px" />
          </Link>
        )}
      </div>
    </div>
  );
};

HomeProduct.defaultProps = {
  productInfo: {},
};

HomeProduct.propTypes = {
  productInfo: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    numReviews: PropTypes.number,
    rating: PropTypes.string,
    price: PropTypes.string,
  }),
};

export default HomeProduct;
