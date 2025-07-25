import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ProductImage from '../../common/Images/ProductImage';
import RatingStars from '../RatingStars/RatingStars';
import WoodenButton from '../../common/Buttons/WoodenButton/WoodenButton';
import Reviews from '../../common/Reviews/Reviews';

import './ProductData.css';

const ProductData = () => {
  const { t } = useTranslation();

  const userLogin = useSelector((state) => state.userLogin);

  const { productInfo } = useSelector((state) => state.productItem);
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const navigate = useNavigate();

  const addToCartHandler = (e) => {
    e.preventDefault();
    navigate(`/cart/${params.id}?quantity=${quantity}`);
  };

  return (
    <div className="product-data">
      <div className="product-image">
        <ProductImage
          src={productInfo.image}
          alt={productInfo.name}
          borderRadius="12px"
        />
      </div>

      <div className="product-detail">
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              <td className="td-left">
                <span>{t('price')}:</span>
              </td>

              <td className="td-right">
                <span>{productInfo.price}</span> <span>$</span> &nbsp;
              </td>
            </tr>

            <tr>
              <td className="td-left">
                <span>{t('status')}:</span>
              </td>

              <td className="td-right">
                {productInfo.countInStock > 0 ? (
                  <span>{t('inStock')}</span>
                ) : (
                  <span>{t('outOfStock')}</span>
                )}
              </td>
            </tr>

            <tr>
              <td
                className={
                  productInfo.countInStock > 0 ? 'td-left' : 'td-left td-last'
                }
              >
                <span>{t('reviews')}:</span>
              </td>

              <td
                className={
                  productInfo.countInStock > 0 ? 'td-right' : 'td-right td-last'
                }
                aria-label="Rating"
              >
                <RatingStars rating={productInfo.rating} />
                <br />
                <Reviews numReviews={productInfo.numReviews} />
              </td>
            </tr>

            {productInfo.countInStock > 0 && (
              <tr>
                <td className="td-left td-last">
                  <span>{t('quantity')}:</span>
                </td>

                <td className="td-right td-last">
                  {productInfo.countInStock > 0 && (
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {[...Array(productInfo.countInStock).keys()].map(
                        (_, index) => {
                          const value = index + 1;

                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          );
                        },
                      )}
                    </select>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {productInfo.countInStock > 0 && (
          <>
            <WoodenButton
              width="inherit"
              label={t('addToCart')}
              onClick={addToCartHandler}
            />
            {userLogin?.userInfo?.isAdmin && (
              <Link to={`/product/${params.id}/update`}>
                <WoodenButton width="inherit" label={t('editProduct')} />
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductData;
