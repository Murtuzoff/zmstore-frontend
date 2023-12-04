import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
  cartAddAction,
  cartRemoveAction,
} from '../../../redux/actions/cartActions';

import ProductImage from '../../common/Images/ProductImage';
import RemoveButton from '../../common/Buttons/RemoveButton/RemoveButton';

import './OrderProduct.css';

const OrderProduct = ({ product, inOrder }) => {
  const dispatch = useDispatch();

  const productQuantityHandler = (e) => {
    dispatch(
      cartAddAction({
        productId: product._id,
        quantity: e.target.value,
      }),
    );
  };

  const productRemoveHandler = () => {
    dispatch(
      cartRemoveAction({
        productId: product._id,
      }),
    );
  };

  return (
    product.quantity > 0 && (
      <div className="cart-product">
        <div className="cart-product-left">
          <div className="cart-product-image">
            <ProductImage
              src={product.image}
              alt={product.name}
              width={!inOrder ? '160px' : '100px'}
              height={!inOrder ? '160px' : '100px'}
              borderRadius="8px"
            />
          </div>

          <div className="cart-product-name">
            <strong>{product.name}</strong>
          </div>
        </div>

        <div className="cart-product-right">
          <div className="cart-product-quantity">
            <span>КОЛИЧЕСТВО:</span>

            {!inOrder ? (
              <select
                value={product.quantity}
                onChange={productQuantityHandler}
              >
                {[...Array(product.countInStock).keys()].map((_, index) => {
                  const value = index + 1;

                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            ) : (
              <strong>{product.quantity}</strong>
            )}
          </div>

          <div className="cart-product-price">
            <span>ЦЕНА:</span>

            <strong>
              <span>{product.price}</span> <span>₽</span>
            </strong>
          </div>
        </div>
        {!inOrder && (
          <RemoveButton
            top="-8px"
            right="-8px"
            onClick={productRemoveHandler}
          />
        )}
      </div>
    )
  );
};

OrderProduct.defaultProps = {
  product: {},
  inOrder: false,
};

OrderProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    quantity: PropTypes.number,
    countInStock: PropTypes.number,
    price: PropTypes.string,
  }),
  inOrder: PropTypes.bool,
};

export default OrderProduct;
